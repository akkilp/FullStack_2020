import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql `
  query{
    allAuthors {
      name,
      bookCount,
      born
    }
  }
`
export const ALL_BOOKS = gql`
  query{
    allBooks{
      title,
      published,
      author{
        name,
        born
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook(
    $title:String!, 
    $author:String!, 
    $published:Int!, 
    $genres:[String!]
  ){
    addBook(
      title:$title, 
      author:$author, 
      published:$published,
      genres: $genres
    ), {
      title, 
      author{name,born}, 
      published,
      genres}
  }
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name,
        born,
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

export const GET_USER = gql`
  query{
    me
      {username,
      favoriteGenre
      }
  }
`

export const FIND_RECOMMENDATIONS = gql`
  query Find_Recommends($favGenre: String!){
    allBooks(genre: $favGenre){
      title,
      author{name},
      published}
  }
`




export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    author{
      name
    },
    published,
    genres
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`