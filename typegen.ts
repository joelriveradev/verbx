import type { CodegenConfig } from '@graphql-codegen/cli'
import { config } from 'dotenv'

config()

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: process.env.HYGRAPH_API_URL_HIGHPERF,
  generates: {
    'src/types/typegen/': {
      preset: 'client',
      plugins: []
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default codegenConfig
