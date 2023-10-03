import { eq, and } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import { courseProgress, moduleCompletion, feedback, user } from './drizzle/schema'
import { NODE_ENV, DATABASE_URL_PROD, DATABASE_URL_DEV } from '$env/static/private'

const connection = connect({
  url: NODE_ENV === 'development' ? DATABASE_URL_DEV : DATABASE_URL_PROD
})

export const db = drizzle(connection)

export type User = typeof user.$inferInsert
export type NewCourseProgress = typeof courseProgress.$inferInsert
export type NewModuleCompletion = typeof moduleCompletion.$inferInsert
export type NewFeedback = typeof feedback.$inferInsert

export const insertFeedback = async (fb: NewFeedback) => {
  return await db.insert(feedback).values(fb)
}

export const insertUser = async (u: User) => {
  return await db.insert(user).values(u)
}

export const updateUser = async (u: User) => {
  return await db.update(user).set(u)
}

export const insertCourseProgress = async (cp: Array<NewCourseProgress>) => {
  return await db.insert(courseProgress).values(cp)
}

export const updateCourseProgress = async (cp: NewCourseProgress) => {
  return await db.update(courseProgress).set(cp).where(eq(courseProgress.userId, cp.userId!))
}

export const insertModuleCompletion = async (mc: Array<NewModuleCompletion>) => {
  return await db.insert(moduleCompletion).values(mc)
}

export const updateModuleCompletion = async (mc: NewModuleCompletion) => {
  return await db
    .update(moduleCompletion)
    .set(mc)
    .where(
      and(
        eq(moduleCompletion.userId, mc.userId!),
        eq(moduleCompletion.courseId, mc.courseId!),
        eq(moduleCompletion.moduleId, mc.moduleId!)
      )
    )
}

interface CourseEnrollmentProps {
  courseId: string
  userId: string
  nextModule: number
  modules: Array<NewModuleCompletion>
}

export const getUserProgress = async (userId: string, courseId: string) => {
  const progress = await db
    .select()
    .from(courseProgress)
    .where(and(eq(courseProgress.userId, userId), eq(courseProgress.courseId, courseId)))

  return !progress.length ? null : progress[0]
}

export const courseEnrollment = async ({
  courseId,
  userId,
  nextModule,
  modules
}: CourseEnrollmentProps) => {
  await insertCourseProgress([
    {
      userId,
      courseId,
      nextModule,
      progress: 0,
      complete: 0
    }
  ])

  await insertModuleCompletion(modules)

  console.log('Course enrollment complete!')
  console.log(`Course ID: ${courseId}`)
  console.log(`User ID: ${userId}`)
}

export const calculateProgress = async (userId: string, courseId: string) => {
  const total = await db
    .select()
    .from(moduleCompletion)
    .where(and(eq(moduleCompletion.userId, userId), eq(moduleCompletion.courseId, courseId)))

  const completed = await db
    .select()
    .from(moduleCompletion)
    .where(
      and(
        eq(moduleCompletion.userId, userId),
        eq(moduleCompletion.courseId, courseId),
        eq(moduleCompletion.complete, 1)
      )
    )

  return (completed.length / total.length) * 100
}
