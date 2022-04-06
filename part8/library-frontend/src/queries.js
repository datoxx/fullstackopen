import { gql } from '@apollo/client'

export const all_Authors = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const all_Books = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

export const add_book = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    author
  }
}
`