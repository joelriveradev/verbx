import { gql } from 'graphql-request'

export const GET_BIBLE_STUDIES = gql`
  {
    bibleStudies {
      id
      title
      duration
      image {
        url
      }
      sections {
        id
        modules {
          __typename
        }
      }
    }
  }
`
