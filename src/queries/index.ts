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

export const GET_BIBLE_STUDY = gql`
  query getBibleStudy($id: ID) {
    bibleStudy(where: { id: $id }) {
      id
      title
      subtitle
      overview
      duration
      image {
        url
      }
      sections {
        title
        modules {
          ... on Introduction {
            title
            text {
              text
            }
          }
          ... on Question {
            type
            title
          }
        }
      }
    }
  }
`
