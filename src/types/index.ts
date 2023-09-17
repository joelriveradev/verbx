import type { BibleStudy, Section } from './typegen/graphql'
export type ModuleType = 'Question' | 'CriticalThinking'

export interface ExerciseMap {
  [id: string]: SVGElement
}

export type HygraphResponse<K extends string, T> = Record<K, T>
export type CourseResponse = HygraphResponse<'bibleStudy', BibleStudy>
export type CourseSections = HygraphResponse<'sections', Section[]>
