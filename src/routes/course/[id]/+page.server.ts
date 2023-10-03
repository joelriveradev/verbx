import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDY } from '../../../queries'
import { getUserProgress } from '../../../db/index.server'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'

import type { CourseResponse } from '../../../types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.getSession()
  const courseId = params.id
  const userId = session?.user?.id

  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)
  const progress = await getUserProgress(userId, courseId)
  const { bibleStudy } = await hygraph.request<CourseResponse>(GET_BIBLE_STUDY, { id: courseId })

  return {
    session,
    bibleStudy,
    progress
  }
}
