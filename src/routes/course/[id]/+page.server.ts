import { GraphQLClient } from 'graphql-request'
import { GET_BIBLE_STUDY } from '../../../queries'
import { HYGRAPH_API_URL_HIGHPERF } from '$env/static/private'

import type { PageServerLoad } from './$types'
import type { BibleStudy } from '../../../types/typegen/graphql'
import type { HygraphResponse } from '../../../types'

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.getSession()
  const hygraph = new GraphQLClient(HYGRAPH_API_URL_HIGHPERF)

  const { bibleStudy } = await hygraph.request<HygraphResponse<'bibleStudy', BibleStudy>>(
    GET_BIBLE_STUDY,
    { id: params.id }
  )

  return { session, bibleStudy }
}
