import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  primaryKey,
  int,
  varchar,
  tinyint,
  text
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const courseProgress = mysqlTable(
  'CourseProgress',
  {
    id: int('id').autoincrement().notNull(),
    userId: varchar('user_id', { length: 50 }),
    progress: tinyint('progress').default(0),
    courseId: varchar('course_id', { length: 50 }),
    complete: tinyint('complete').default(0),
    nextModule: tinyint('nextModule')
  },
  (table) => {
    return {
      userId: index('user_id').on(table.userId),
      courseId: index('course_id').on(table.courseId),
      courseProgressId: primaryKey(table.id)
    }
  }
)

export const moduleCompletion = mysqlTable(
  'ModuleCompletion',
  {
    id: int('id').autoincrement().notNull(),
    userId: varchar('user_id', { length: 50 }),
    courseId: varchar('course_id', { length: 50 }),
    moduleId: varchar('module_id', { length: 50 }),
    complete: tinyint('complete').default(0),
    answer: text('answer')
  },
  (table) => {
    return {
      courseId: index('course_id').on(table.courseId),
      moduleId: index('module_id').on(table.moduleId),
      userId: index('user_id').on(table.userId),
      moduleCompletionId: primaryKey(table.id)
    }
  }
)

export const feedback = mysqlTable(
  'feedback',
  {
    id: int('id').autoincrement().notNull(),
    question: text('question'),
    answer: text('answer'),
    acceptable: tinyint('acceptable'),
    feedback: text('feedback'),
    scripture_text: text('scripture_text'),
    scripture_ref: text('scripture_ref')
  },
  (table) => {
    return {
      feedbackId: primaryKey(table.id)
    }
  }
)

export const user = mysqlTable(
  'user',
  {
    id: int('id').autoincrement().notNull(),
    userId: varchar('user_id', { length: 50 }),
    username: varchar('username', { length: 50 }),
    verified: tinyint('verified').default(0)
  },
  (table) => {
    return {
      userId: primaryKey(table.id)
    }
  }
)
