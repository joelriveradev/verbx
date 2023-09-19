import type { PageServerLoad } from './$types'

interface Provider {
  id: string
  label: string
  callbackUrl: string
}

interface ServerLoadResponse {
  session?: Session | null
  providers: Array<Provider>
}

export const load: PageServerLoad = async ({ locals, url }): Promise<ServerLoadResponse> => {
  const session = await locals.getSession()
  const callbackUrl = new URL(url).searchParams.get('originalUrl') ?? '/'

  return {
    session,
    providers: [
      { id: 'google', label: 'Google', callbackUrl },
      { id: 'facebook', label: 'Facebook', callbackUrl }
    ]
  }
}
