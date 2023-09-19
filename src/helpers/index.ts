import type { Section, SectionmodulesUnion } from '../types/typegen/graphql'

export const getCurrentSection = (sections: Array<Section> | undefined): Section | undefined => {
  if (sections) return sections[0]
}

export const getCurrentModule = (
  section: Section,
  id?: string
): SectionmodulesUnion | undefined => {
  return !id ? section.modules[1] : section.modules.find((module) => module.id === id)
}
