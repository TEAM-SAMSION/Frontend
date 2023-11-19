import axios from 'axios'
import { url } from '../Shared'

////// 팀 정보 //////
export const getTeamInfo = async (accessToken, teamId) => {
  let API = `/teams/${teamId}`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}

export const postTeamInfo = async (accessToken, teamId, data) => {
  let API = `/teams/${teamId}`
  const response = await axios.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  })
}

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

////// 펫 관리 //////
export const getPet = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/pets`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}

export const addPet = async (accessToken, teamId, data) => {
  let API = `/teams/${teamId}/pets`
  const response = await axios.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  })
}

export const deletePet = async (accessToken, petId) => {
  let API = `/teams/pets/${petId}`
  const response = await axios.delete(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
}

export const changePetInfo = async (accessToken, petId, data) => {
  let API = `/teams/pets/${petId}`
  const response = await axios.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  })
}
