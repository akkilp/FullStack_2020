import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import messageReducer from './messageReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: messageReducer
})

export const store = createStore(
    reducer, 
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)
