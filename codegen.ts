import type { CodegenConfig } from '@graphql-codegen/cli'

export const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/cll9n28pn1fcu01uj03na9zl7/master',
  generates: {
    'src/types/generated/typegen.ts': {
      plugins: ['typescript']
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}
