import axios from 'axios'
import { url } from '../Shared'

export const getUserInfo = async (accessToken) => {
  let API = `/user`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data
}

export const getTeamList = async (accessToken) => {
  const page = 0
  const size = 10000
  let API = `/teams?page=${page}&size=${size}`
  const response = await axios.get(url + API, {
    params: { page, size },
    headers: { Authorization: accessToken },
  })
  return response.data.content
}
