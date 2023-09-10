import { and, eq } from 'drizzle-orm'
import { courseProgress, moduleCompletion } from '../../drizzle/schema'
import { db } from './index.server'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'

import { GraphQLClient } from 'graphql-request'
import { GET_SECTIONS } from '../queries'

import type { BibleStudy } from '../types/typegen/graphql'
import type { HygraphResponse } from '../types'
import type { NewModuleCompletion } from './index.server'

export const enrollInCourse = async (userId: string, courseId: string) => {
  const modules: Array<NewModuleCompletion> = []
  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)

  const { bibleStudy } = await hygraph.request<HygraphResponse<'bibleStudy', BibleStudy>>(
    GET_SECTIONS,
    { id: courseId }
  )

  bibleStudy.sections.forEach((section) => {
    section.modules.forEach(({ id }) => {
      modules.push({
        userId,
        courseId,
        sectionId: section.id,
        moduleId: id,
        complete: false
      })
    })
  })

  const progress = await db
    .select()
    .from(courseProgress)
    .where(and(eq(courseProgress.courseId, courseId), eq(courseProgress.userId, userId)))

  if (!progress.length) {
    // await db.transaction(async (transaction) => {
    //   const currentSection = bibleStudy.sections[0]
    //   const currentSectionId = currentSection.id
    //   const currentModuleId = currentSection.modules[0].id
    //   await transaction.insert(courseProgress).values({
    //     userId,
    //     courseId,
    //     progress: 0,
    //     currentSectionId,
    //     currentModuleId
    //   })
    //   modules.forEach(async (m) => {
    //     await transaction.insert(moduleCompletion).values(m)
    //   })
    // })
  }
}
