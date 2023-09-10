import type { BibleStudy } from '../../../types/typegen/graphql'
import type { HygraphResponse } from '../../../types'
import type { PageServerLoad, Actions } from './$types'

import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDY } from '../../../queries'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'
import { db, insertModuleCompletion } from '../../../db/index.server'
import { enrollInCourse } from '../../../db/actions'
import { redirect } from '@sveltejs/kit'

export const actions = {
  updateSection: async ({ locals, request }) => {},
  updateModule: async ({ locals, request, params }) => {
    const sesh = await locals.getSession()
    const data = await request.formData()
    const user = sesh?.user
    const courseId = params.id
    const sectionId = data.get('sectionId') as string
    const moduleId = data.get('moduleId') as string
    const answer = data.get('answer')

    console.log({
      userId: user?.id,
      courseId,
      sectionId,
      moduleId,
      complete: true,
      answer
    })

    // await insertModuleCompletion({
    //   userId: user?.id,
    //   courseId,
    //   sectionId,
    //   moduleId,
    //   complete: true
    // })
    //   .then(() => {})
    //   .catch((error) => {
    //     if (error instanceof Error) {
    //       return new Response(null, {
    //         status: 500,
    //         statusText: error.message
    //       })
    //     }
    //   })

    return {
      answer,
      response: `That's correct!`
    }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.getSession()

  if (!session) {
    throw redirect(303, `/auth/signIn?originalUrl=/classroom/${params.id}`)
  }

  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)

  const { bibleStudy } = await hygraph.request<HygraphResponse<'bibleStudy', BibleStudy>>(
    GET_BIBLE_STUDY,
    { id: params.id }
  )

  await enrollInCourse(session.user?.id, params.id)

  return { session, bibleStudy }
}
