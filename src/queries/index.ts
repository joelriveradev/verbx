import { gql } from 'graphql-request'

export const GET_SECTIONS = gql`
  query getSections($id: ID!) {
    bibleStudy(where: { id: $id }) {
      sections {
        id
        modules {
          ... on Introduction {
            id
          }
          ... on Question {
            id
          }
        }
      }
    }
  }
`

export const GET_SECTION = gql`
  query getSection($id: ID!) {
    section(where: { id: $id }) {
      modules(first: 50) {
        ... on Introduction {
          id
          title
          text {
            text
          }
        }
        ... on Question {
          id
          verses(first: 5) {
            ... on Verse {
              verse
              text {
                text
              }
            }
          }
          connectingVerses(first: 50) {
            ... on Verse {
              verse
              text {
                text
              }
            }
          }
          commentaries(first: 5) {
            text {
              text
            }
            author
            reference
          }
          note {
            text
          }
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
        id
        title
        modules {
          ... on Introduction {
            __typename
            id
            title
            text {
              text
            }
          }
          ... on Question {
            __typename
            id
            type
            title
            question
            answer
            verses(first: 5) {
              ... on Verse {
                verse
                text {
                  text
                }
              }
            }
            connectingVerses(first: 5) {
              ... on Verse {
                verse
                text {
                  text
                }
              }
            }
            commentaries(first: 5) {
              text {
                text
              }
              author
              reference
            }
            note {
              text
            }
          }
        }
      }
    }
  }
`
