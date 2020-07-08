import axios from 'axios'

import {asObject} from '../reducers/anecdoteReducer'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const likePost = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}
