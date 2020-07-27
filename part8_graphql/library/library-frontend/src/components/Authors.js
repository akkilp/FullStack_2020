  
import React, { useEffect, useState } from 'react'
import {EDIT_AUTHOR, ALL_AUTHORS} from '../queries'
import {useMutation} from '@apollo/client'

/* ${authors.allAuthors[0].name} */

const Authors = ({authors, show}) => {
  const [name, setName] = useState(`${authors ? authors.allAuthors[0].name : ''}`)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const handleUpdate = async (event) => {
    event.preventDefault()
    editAuthor({variables:{name, setBornTo: parseInt(born)}})
    setName("")
    setBorn("")
  }

  if (!show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : "unknown"}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

  <form onSubmit={handleUpdate}>
        <div>
          name
          <select value={name} onChange={(event)=> setName(event.target.value)}>
            {authors.allAuthors.map(author =>
              <option key={author.name} value={`${author.name}`}> {author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>Update</button>
        </form>
    </div>
  )
}

export default Authors
