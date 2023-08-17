import { GraphQLClient } from 'graphql-request'
import type { PageServerLoad } from './$types'
import type { BibleStudy } from '../types/typegen/graphql'
import { GET_BIBLE_STUDIES } from '../queries'
import type { HygraphResponse } from '../types'

export const load: PageServerLoad = async () => {
  const url = import.meta.env.VITE_HYGRAPH_API_URL_HIGHPERF_CONST
  const hygraph = new GraphQLClient(url)

  try {
    const { bibleStudies } = await hygraph.request<HygraphResponse<'bibleStudies', BibleStudy[]>>(
      GET_BIBLE_STUDIES
    )

    return { bibleStudies }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
