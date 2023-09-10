import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import { courseProgress, sectionProgress, moduleCompletion, users } from '../../drizzle/schema'
import { NODE_ENV, DATABASE_URL_PROD, DATABASE_URL_DEV } from '$env/static/private'

const connection = connect({
  url: NODE_ENV === 'development' ? DATABASE_URL_DEV : DATABASE_URL_PROD
})

export const db = drizzle(connection)

export type User = typeof users.$inferInsert
export type NewCourseProgress = typeof courseProgress.$inferInsert
export type NewSectionProgress = typeof sectionProgress.$inferInsert
export type NewModuleCompletion = typeof moduleCompletion.$inferInsert

export const insertUser = async (user: User) => {
  return db.insert(users).values(user)
}

export const insertCourseProgress = async (cp: NewCourseProgress) => {
  return db.insert(courseProgress).values({
    userId: cp.userId,
    courseId: cp.courseId,
    progress: cp.progress
  })
}

export const insertSectionProgress = async (sp: NewSectionProgress) => {
  return db.insert(courseProgress).values(sp)
}

export const insertModuleCompletion = async (mc: NewModuleCompletion) => {
  return db.insert(courseProgress).values(mc)
}
