import axios from 'axios'
import { url } from '../Shared'

////// 회원 관리 //////
export const getMember = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/registers/manage`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}

export const changeAuthority = async (accessToken, teamId, registerId, authority) => {
  let API = `/teams/${teamId}/registers/${registerId}`
  let data = { authority: authority }
  const response = await axios.put(url + API, data, {
    headers: {
      Authorization: accessToken,
    },
  })
}

export const searchMember = async (accessToken, teamId, nickname) => {
  let API = `/teams/${teamId}/registers/search`
  const response = await axios.get(url + API, {
    params: { nickname: nickname },
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}
