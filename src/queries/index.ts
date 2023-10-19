import { gql } from 'graphql-request'

export const GET_MODULE = gql`
  query getModule($id: ID!) {
    module(where: { id: $id }) {
      introduction {
        text
      }
      question
      answer
      verses {
        reference
        text {
          text
        }
      }
    }
  }
`

export const GET_BIBLE_STUDIES = gql`
  {
    bibleStudies {
      id
      title
      duration
      image {
        url
      }
    }
  }
`

export const GET_BIBLE_STUDY = gql`
  query getBibleStudyByID($id: ID) {
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
        id
        title
        modules_v2(first: 100) {
          id
          title
          order
          isCriticalthinking
          introduction {
            html
          }
          question
          answer
          verses {
            reference
            text {
              text
            }
          }
          commentaries {
            text {
              text
            }
            reference
            author
          }
          connectingVerses {
            reference
            text {
              text
            }
          }
          note
        }
      }
    }
  }
`
