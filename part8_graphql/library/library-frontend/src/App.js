
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import {useQuery, useSubscription, useApolloClient} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, GET_USER, BOOK_ADDED} from './queries'



const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setMessage] = useState(null)

  const allAuthors = useQuery(ALL_AUTHORS,{
    pollInterval: 10000
  })
  const allBooks = useQuery(ALL_BOOKS,{
    pollInterval: 10000
  })

  const user = useQuery(GET_USER)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library_user')
    if ( token ) {
      setToken(token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`New book released: '${subscriptionData.data.bookAdded.title}' by ${subscriptionData.data.bookAdded.author.name}`) 

      if(allBooks&&allBooks.data){
        console.log(allBooks.data, subscriptionData.data.bookAdded)
        allBooks.data.allBooks.concat(subscriptionData.data.bookAdded)
      }
    }
  })

  if(allAuthors.loading||allBooks.loading) {
    return <div> Loading... </div>
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={()=> logOut()}>Log Out</button>
      </div>

      <Authors
        authors={allAuthors.data}
        show={page === 'authors'}
      />

      <Recommendations
        books={allBooks.data}
        show={page === 'recommendations'}
        userData={user.data}
      />

      <Books
        books={allBooks.data}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App