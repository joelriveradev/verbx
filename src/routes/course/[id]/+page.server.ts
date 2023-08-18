import { GraphQLClient } from 'graphql-request'
import type { BibleStudy } from '../../../types/typegen/graphql'
import type { HygraphResponse } from '../../../types'
import { GET_BIBLE_STUDY } from '../../../queries'

export const load = async ({ params }) => {
  const url = import.meta.env.VITE_HYGRAPH_API_URL_HIGHPERF_CONST
  const hygraph = new GraphQLClient(url)

  try {
    const { bibleStudy } = await hygraph.request<HygraphResponse<'bibleStudy', BibleStudy>>(
      GET_BIBLE_STUDY,
      { id: params.id }
    )

    return { bibleStudy }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
  }
}
