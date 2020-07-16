import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getSingleUser = async(id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
  }

const getSingleBlog= async(id) => {
  const request = await axios.get(`/api/blogs/${id}`)
  return request.data
  }


export default { getUsers, getSingleUser, getSingleBlog }