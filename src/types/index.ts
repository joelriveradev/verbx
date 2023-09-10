import type { DefaultSession } from '@auth/core/types'
export type ModuleType = 'Question' | 'CriticalThinking'

export interface ExerciseMap {
  [id: string]: SVGElement
}

export type HygraphResponse<K extends string, T> = Record<K, T>

declare module '@auth/sveltekit' {
  interface Session {
    user: { id: string } & DefaultSession['user']
    profile: {}
    account: {}
  }
}
