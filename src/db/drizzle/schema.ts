import {
  mysqlTable,
  index,
  primaryKey,
  tinyint,
  varchar,
  boolean,
  text
} from 'drizzle-orm/mysql-core'

const id = tinyint('id').autoincrement().notNull()
const userId = varchar('user_id', { length: 50 })
const courseId = varchar('course_id', { length: 50 })
const moduleId = varchar('module_id', { length: 50 })
const progress = tinyint('progress').default(0)
const complete = boolean('complete').default(false)

export const courseProgress = mysqlTable(
  'CourseProgress',
  {
    id,
    userId,
    courseId,
    progress,
    complete,
    nextModule: tinyint('nextModule')
  },
  (table) => {
    return {
      userId: index('user_id').on(table.userId),
      courseId: index('course_id').on(table.courseId),
      id: primaryKey(table.id)
    }
  }
)

export const moduleCompletion = mysqlTable(
  'ModuleCompletion',
  {
    id,
    userId,
    courseId,
    moduleId,
    complete,
    answer: text('answer')
  },
  (table) => {
    return {
      courseId: index('course_id').on(table.courseId),
      moduleId: index('module_id').on(table.moduleId),
      userId: index('user_id').on(table.userId),
      id: primaryKey(table.id)
    }
  }
)

export const users = mysqlTable(
  'user',
  {
    id,
    userId,
    username: varchar('username', { length: 50 }),
    verified: boolean('verified').default(false)
  },
  (table) => {
    return {
      id: primaryKey(table.id)
    }
  }
)
