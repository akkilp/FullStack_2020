import React from 'react'
import {useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {messageChange} from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(messageChange(`Created anecdote '${content}'`, 4))
}

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreation}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm