import { SvelteKitAuth } from '@auth/sveltekit'
import { db, insertUser } from './db/index.server'
import { user as users } from './db/drizzle/schema'
import { eq } from 'drizzle-orm'

import Google from '@auth/core/providers/google'
import Facebook from '@auth/core/providers/facebook'

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET
} from '$env/static/private'

export const handle = SvelteKitAuth({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    Facebook({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signIn'
  },
  events: {
    createUser: () => {},
    signIn: async ({ user, profile }) => {
      const { id: userId, name: username } = user

      try {
        // check to see if the user
        // is already in our database
        const res = await db.select().from(users).where(eq(users.userId, userId))
        const verified = Number(profile?.email_verified)

        // If not, add them
        if (!res.length) {
          await insertUser({
            userId,
            username,
            verified
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  callbacks: {
    session: async ({ session, token }) => {
      const { sub: id } = token
      return { ...session, user: { ...session.user, id } }
    }
  }
})
