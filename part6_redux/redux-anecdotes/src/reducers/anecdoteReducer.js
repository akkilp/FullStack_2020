
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

import { getAll, createNew, likePost } from "../services/services"


const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

export const voteLike = (id, anecdotes) => {
  return async dispatch => {
    const findItem = anecdotes.find(item=> item.id===id)
    const updatedObject = {...findItem, votes: findItem.votes+1}
    const updatedItem = await likePost(findItem.id, updatedObject)
    dispatch({
      type: 'VOTE_LIKE',
      data: {
        id: updatedItem.id
      },
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newItem = await createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newItem
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const items = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: items,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE_LIKE':
      const id = action.data.id
      const anecdoteToLike = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToLike,
        votes: anecdoteToLike.votes+1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote: updatedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }

}

export default anecdoteReducer