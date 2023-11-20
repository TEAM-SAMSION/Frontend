import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const updateToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  let API = `/reissue`
  let body = {}
  if (refreshToken) {
    const response = await axios.post(url + API, body, {
      headers: {
        RefreshToken: refreshToken,
      },
    })
    console.log('토큰재발급 Response:', response.data)
  }
  console.log('토큰재발급!!!!!!!:', response)
  return response.data
}

const axiosInstance = axios.create({
  baseURL: 'https://dev.pawith.com',
  timeout: 5000,
})
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    // console.log('asyncStorage내 accessToken 현황:', accessToken ? accessToken.substring(0, 10) : '없음')
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
    console.log('axiosInstance에서 에러 감지', error.config.method, error.config.url)
    // 액세스 토큰이 만료됐다면
    if (error.response.errorCode === 1001) {
      console.log('액서스토큰 만료')
      const data = await updateToken() // 액세스토큰 갱신

      // 갱신된 accessToken을 받으면
      if (data) {
        AsyncStorage.setItem('accessToken', data.accessToken) // 새로운 토큰 localStorage 저장
        AsyncStorage.setItem('refreshToken', data.refreshToken)
        error.config.headers['Authorization'] = data.accessToken // 원래 api 요청의 headers의 accessToken도 변경
        const originalResponse = await axios.request(error.config) // 원래 api 요청하기
        return originalResponse // 원래 api 요청의 response return
      }
      // 리프레시 토큰도 만료됐으면 로그인 페이지로 이동
      else {
        AsyncStorage.clear()
        console.log('예외처리됨')
      }
    }
    return Promise.reject(error)
  },
)
export default axiosInstance
