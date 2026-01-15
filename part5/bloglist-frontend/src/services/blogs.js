import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log(newToken, 'new token in service')
  console.log(token, 'set token')
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  console.log('token in create', token)
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (likeBlog, id) => {
  console.log('making a put request')
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, likeBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  console.log('making a delete request')
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  create,
  like,
  deleteBlog,
  setToken
}
