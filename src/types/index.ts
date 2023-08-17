export type ModuleType = 'Question' | 'CriticalThinking'

export interface ExerciseMap {
  [id: string]: SVGElement
}

export type HygraphResponse<K extends string, T> = Record<K, T>
