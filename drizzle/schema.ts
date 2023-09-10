import { mysqlTable, index, primaryKey, tinyint, varchar, boolean } from 'drizzle-orm/mysql-core'

const id = tinyint('id').autoincrement().notNull()
const userId = varchar('user_id', { length: 50 })
const courseId = varchar('course_id', { length: 50 })
const sectionId = varchar('section_id', { length: 50 })
const moduleId = varchar('module_id', { length: 50 })
const progress = tinyint('progress').default(0)

export const courseProgress = mysqlTable(
  'CourseProgress',
  {
    id,
    userId,
    courseId,
    currentSectionId: varchar('current_section_id', { length: 50 }),
    // currentModuleId: varchar('current_module_id', { length: 50 }),
    progress
  },
  (table) => {
    return {
      courseId: index('course_id').on(table.courseId),
      userId: index('user_id').on(table.userId),
      courseProgressId: primaryKey(table.id),
      currentSectionId: index('current_section_id_index').on(table.currentSectionId)
      // currentModuleId: index('current_module_id_index').on(table.currentModuleId)
    }
  }
)

export const moduleCompletion = mysqlTable(
  'ModuleCompletion',
  {
    id,
    userId,
    courseId,
    sectionId,
    moduleId,
    complete: boolean('complete').default(false)
  },
  (table) => {
    return {
      courseId: index('course_id').on(table.courseId),
      moduleId: index('module_id').on(table.moduleId),
      sectionId: index('section_id').on(table.sectionId),
      userId: index('user_id').on(table.userId),
      moduleCompletionId: primaryKey(table.id)
    }
  }
)

export const sectionProgress = mysqlTable(
  'SectionProgress',
  {
    id,
    userId,
    sectionId,
    courseId,
    currentModuleId: varchar('current_module_id', { length: 50 }),
    progress
  },
  (table) => {
    return {
      courseId: index('course_id').on(table.courseId),
      sectionId: index('section_id').on(table.sectionId),
      currentModuleId: index('current_module_id_index').on(table.currentModuleId),
      userId: index('user_id').on(table.userId),
      sectionProgressId: primaryKey(table.id)
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
