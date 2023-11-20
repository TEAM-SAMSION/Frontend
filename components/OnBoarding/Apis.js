import { url } from '../Shared'
import axiosInstance from '../../utils/customAxios'
import axios from 'axios'

export const registerNickname = async (nickname, accessToken) => {
  let API = `/user/name`
  try {
    const response = await axios.put(
      url + API,
      { nickname: nickname },
      {
        headers: { Authorization: accessToken },
      },
    )
    return response.status
  } catch (e) {
    console.log(e)
  }
}
export const registerRoute = async (path) => {
  let API = `/user/path`
  const response = await axiosInstance.post(url + API, { path: path })
  return response.status
}

export const postDeviceToken = async (deviceToken) => {
  console.log(deviceToken)
  let API = `/alarms/token`
  try {
    const response = await axiosInstance.post(url + API, { deviceToken })
    return response
  } catch (e) {
    console.log('deviceToken 저장 api 에러:', e)
  }
}
