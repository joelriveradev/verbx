import type { RequestHandler } from './$types'
import { json, redirect } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, params, locals }) => {
  const session = await locals.getSession()

  // user not authenticated
  if (!session) {
    throw redirect(304, `/api/signIn`)
  }

  const { action } = params
  const { body } = await request.json()

  // no action specified
  if (!action) {
    return new Response(null, {
      status: 500,
      statusText: 'Error: action not specified.'
    })
  }

  // no payload provided
  if (!body) {
    return new Response(null, {
      status: 500,
      statusText: 'Error: payload not provided.'
    })
  }

  // update the database
  if (action === 'set_complete') {
    console.log({ body })
    // await insertModuleCompletion({
    //   userId: session.user?.id,
    //   ...body.payload
    // }).catch((error) => {
    //   if (error instanceof Error) {
    //     return new Response(null, {
    //       status: 500,
    //       statusText: error.message
    //     })
    //   }
    // })
  }

  return json({})
}
