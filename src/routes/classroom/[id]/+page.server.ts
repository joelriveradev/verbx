import type { CourseResponse } from '../../../types'
import type { Actions } from './$types'
import type { Module } from '../../../types/typegen/graphql'
import type { NewModuleCompletion } from '../../../db/index.server'

import {
  updateCourseProgress,
  updateModuleCompletion,
  courseEnrollment,
  calculateProgress,
  insertFeedback
} from '../../../db/index.server'

import { db } from '../../../db/index.server'
import { eq } from 'drizzle-orm'
import { courseProgress } from '../../../db/drizzle/schema'
import { getChatGPTFeedback } from '$lib/integrations/openAI/feedback'
import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDY, GET_MODULE } from '../../../queries'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
  const session = await locals.getSession()

  if (!session) {
    throw redirect(303, `/auth/signIn?originalUrl=/classroom/${params.id}`)
  }

  const courseId = params.id
  const userId = session.user?.id

  let activeModule: Module | undefined
  let lastModule: Module | undefined
  let modules: Array<NewModuleCompletion> = []

  const progress = await db.select().from(courseProgress).where(eq(courseProgress.userId, userId))
  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)
  const bibleStudy = await hygraph.request<CourseResponse>(GET_BIBLE_STUDY, { id: courseId })

  const { bibleStudy: course } = bibleStudy

  if (!progress.length) {
    const defaultModule = course.sections[0].modules_v2[0]

    course.sections.forEach(({ modules_v2 }) => {
      modules_v2.forEach(({ id }) => {
        modules.push({
          userId,
          courseId,
          moduleId: id,
          complete: 0
        })
      })
    })

    await courseEnrollment({
      courseId,
      userId,
      nextModule: defaultModule.order,
      modules
    })

    return {
      session,
      course,
      activeModule: defaultModule,
      submitted: false,
      answer: null,
      feedback: null,
      progress: 0
    }
  }

  // This is faster than making yet
  // another call to the CMS. We already
  // have the data, might as well use it.
  course.sections.forEach(({ modules_v2 }) => {
    const nextModule = modules_v2.find(({ order }) => {
      return order === progress[0].nextModule
    })

    if (nextModule) {
      activeModule = nextModule
    }
    if (progress[0].complete) {
      const last = modules_v2.find(({ order }) => {
        return order === progress[0].nextModule! - 1
      })

      if (last) {
        lastModule = last
      }
    }
  })

  return {
    session,
    course,
    activeModule: progress[0].complete ? lastModule : activeModule,
    progress: progress[0].progress,
    complete: progress[0].complete
  }
}

export const actions = {
  default: async ({ locals, request, params }) => {
    const session = await locals.getSession()
    const data = await request.formData()
    const user = session?.user
    const userId = user?.id
    const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)

    const courseId = params.id
    const moduleId = data.get('moduleId') as string
    const order = data.get('order') as string
    const answer = data.get('answer') as string

    await updateModuleCompletion({
      userId,
      courseId,
      moduleId,
      complete: 1,
      answer
    })

    const progress = await calculateProgress(userId, courseId)
    const complete = progress === 100

    await updateCourseProgress({
      userId,
      courseId,
      progress,
      nextModule: Number(order) + 1,
      complete: complete ? 1 : 0
    })

    const { module } = await hygraph.request<{ module: Module }>(GET_MODULE, { id: moduleId })

    // chatGPT evaluation
    if (!module.introduction && module.question && module.answer) {
      const { question, answer: expected_answer, verses } = module

      const scripture_ref = verses[0]?.reference || undefined
      const scripture_text = verses[0]?.text?.text || undefined

      const response = await getChatGPTFeedback({
        question,
        answer,
        expected_answer,
        verse: {
          reference: scripture_ref,
          text: scripture_text
        }
      })

      if (response) {
        await insertFeedback({
          question,
          answer,
          feedback: response.feedback,
          acceptable: Number(response.acceptable),
          scripture_ref,
          scripture_text
        })

        return {
          answer,
          submitted: true,
          response
        }
      }
    }
  }
} satisfies Actions
