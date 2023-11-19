import axios from 'axios'
import { url } from '../Shared'

export const registerNickname = async (accessToken, nickname) => {
  // try {
  let API = `/user/name`
  const response = await axios.put(
    url + API,
    { nickname: nickname },
    {
      headers: {
        Authorization: accessToken,
        'Content-Type': `application/json; charset=UTF-8`,
      },
    },
  )
  return response.status
  // } catch (e) {
  //   const newAccessToken = updateToken(e.response)
  //   const response = await axios.get(url + API, {
  //     headers: {
  //       Authorization: newAccessToken,
  //     },
  //   })
  //   console.log('getTodoTeamList Res after tokenUpdate:', response.data)
  //   return response.data
  // }
}
export const registerRoute = async (accessToken, path) => {
  let API = `/user/path`
  const response = await axios.post(
    url + API,
    { path: path },
    {
      headers: {
        Authorization: accessToken,
        'Content-Type': `application/json; charset=UTF-8`,
      },
    },
  )
  return response.status
}
