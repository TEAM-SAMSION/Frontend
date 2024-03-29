import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { checkFCMToken } from '../AppBase'
import { url } from '../components/Shared'
import NaverLogin from '@react-native-seoul/naver-login'

const updateToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken')

  let API = `/reissue`
  let body = {}
  if (refreshToken) {
    try {
      const response = await axios.post(url + API, body, {
        headers: {
          RefreshToken: refreshToken,
        },
      })
      console.log('재발급 결과:', response.status)
      return response.data
    } catch (e) {
      console.log('재발급과정 실패1', e)
      return false
    }
  } else {
    console.log('재발급과정 실패2', e)
    return false
  }
}

export const LogOut = async (setLoggedIn) => {
  NaverLogin.logout()
  console.log('Naver Logout')
  await AsyncStorage.removeItem('accessToken')
  await AsyncStorage.removeItem('refreshToken')
  setLoggedIn(false)
}
const axiosInstance = axios.create({
  baseURL: 'https://api.pawith.com',
  timeout: 5000,
})
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    if (!accessToken) {
      return config
    } else {
      config.headers['Authorization'] = `${accessToken}`
      return config
    }
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적인 경우 아무것도 하지 않음
  async (error) => {
    console.log('axiosInstance에서 에러 감지', error.config.method, error.config.url, error.response.data.errorCode)
    // 유효하지 않은 토큰입니다. / 토큰이 만료되었습니다. / 토큰이 존재하지 않습니다.
    if (error.response.data.errorCode === 1001) {
      const data = await updateToken() // 액세스토큰 갱신
      // 갱신된 accessToken을 받으면
      if (data) {
        console.log('갱신된 accessToken을 받음 axiosInstance:', data)
        AsyncStorage.setItem('accessToken', data.accessToken) // 새로운 토큰 localStorage 저장
        AsyncStorage.setItem('refreshToken', data.refreshToken)
        error.config.headers['Authorization'] = data.accessToken // 원래 api 요청의 headers의 accessToken도 변경
        checkFCMToken(data.accessToken)
        const originalResponse = await axios.request(error.config) // 원래 api 요청하기
        return originalResponse // 원래 api 요청의 response return
      } else {
        // 리프레시 토큰도 만료됐으면 로그인 페이지로 이동
        LogOut()
        console.log('Else')
      }
    } else {
      console.log('토큰 만료 외의 이유로 API 호출에 에러 발생')
    }
    return Promise.reject(error)
  },
)
export default axiosInstance
