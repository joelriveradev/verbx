import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDIES } from '../queries'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'

import type { CoursesResponse } from '../types'
import type { BibleStudy } from '../types/typegen/graphql'

export const load = async () => {
  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)

  try {
    const { bibleStudies } = await hygraph.request<CoursesResponse>(GET_BIBLE_STUDIES)

    return { bibleStudies }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
