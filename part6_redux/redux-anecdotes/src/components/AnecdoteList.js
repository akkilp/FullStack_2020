// Parts which are commented include redux using the connected component

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteLike} from '../reducers/anecdoteReducer'
import {messageChange} from '../reducers/messageReducer'
// import { connect } from 'react-redux'

const AnecdoteList = (props) => {


  const anecdotes = useSelector( ({anecdotes,filter}) => {
      if(filter.length>0){
        return anecdotes.filter(item=>item.content.toLowerCase().includes(filter.toLowerCase()))  
      } 
      return (anecdotes.sort((a,b)=>{return a.votes>b.votes ? -1 : 1}))
  })

  const dispatch = useDispatch()

  const handleDispatch = (item) =>{
    dispatch(voteLike(item.id, anecdotes))
    dispatch(messageChange(`Like anecdote '${item.content}'`, 2))
  }
  
  return (
    <div>
      {/* props. */anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={()=> handleDispatch(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
/* 
const mapStateToProps = (state) => {
  if(state.filter.length>0) {
    return {
      anecdotes: state.anecdotes
        .filter(item=>item.content.toLowerCase()
        .includes(state.filter.toLowerCase())
        )
      }
  }
  return {anecdotes: state.anecdotes}
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes */

export default AnecdoteList