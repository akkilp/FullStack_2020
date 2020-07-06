import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const response = axios.put(`${ baseUrl }/${id}`, newObject)
  return response
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, remove }