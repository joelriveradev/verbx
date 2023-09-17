import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDY } from '../../../queries'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'

import type { CourseResponse } from '../../../types'
import type { PageServerLoad } from './$types'

import { db } from '../../../db/index.server'
import { courseProgress } from '../../../db/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.getSession()
  const courseId = params.id

  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)
  const { bibleStudy } = await hygraph.request<CourseResponse>(GET_BIBLE_STUDY, { id: courseId })

  const progress = await db
    .select()
    .from(courseProgress)
    .where(and(eq(courseProgress.userId, session?.user?.id), eq(courseProgress.courseId, courseId)))

  return { session, bibleStudy, progress: progress[0] }
}
