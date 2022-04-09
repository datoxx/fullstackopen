import { gql } from '@apollo/client'

export const all_Authors = gql`
query {
  allAuthors{
    name
    born
    bookCount
  }
}
`

export const all_Books = gql`
query {
  allBooks{
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
}
`
export const all_books_with_genres = gql`
  query filterAllBooks($genre: String!){
    allBooks(genre: $genre){
      title
      published
      author {
        name
      }
      genres
      id
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
    author {
      name
      born
      bookCount
    }
  }
}
`

export const change_birthYear = gql`
mutation changeBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me{
      username
      favoriteGenre
    }
  }
`