import React, { useState } from 'react'
import {ADD_BOOK, ALL_BOOKS} from '../queries'
import {useMutation} from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState("")

  const [ createBook ] = useMutation(ADD_BOOK, {update: (store, response) => {
    const dataInStore = store.readQuery({ query: ALL_BOOKS })
    store.writeQuery({
      query: ALL_BOOKS,
      data: {
        ...dataInStore,
        allBooks: [ ...dataInStore.allBooks, response.data.addBook]
      }
    })
    }
  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({variables:{title, author, published, genres}})
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook