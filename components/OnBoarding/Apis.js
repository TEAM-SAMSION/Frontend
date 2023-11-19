import { url } from '../Shared'
import axiosInstance from '../../utils/customAxios'

export const registerNickname = async (nickname) => {
  let API = `/user/name`
  const response = await axiosInstance.put(url + API, { nickname: nickname })
  return response.status
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
    const response = await axiosInstance.post(url + API, { deviceToken: deviceToken })
    return response
  } catch (e) {
    console.log('deviceToken 저장 api 에러:', e)
  }
}
