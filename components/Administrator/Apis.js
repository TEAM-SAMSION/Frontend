import axiosInstance from '../../utils/customAxios'
import { url } from '../Shared'

////// 팀 정보 //////
export const getTeamInfo = async (teamId) => {
  let API = `/teams/${teamId}`
  const response = await axiosInstance.get(url + API)
  return response.data
}

export const postTeamInfo = async (teamId, data) => {
  let API = `/teams/${teamId}`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

////// 회원 관리 //////
export const getMember = async (teamId) => {
  let API = `/teams/${teamId}/registers/manage`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const changeAuthority = async (teamId, registerId, authority) => {
  let API = `/teams/${teamId}/registers/${registerId}`
  let data = { authority: authority }
  const response = await axiosInstance.put(url + API, data)
}

export const searchMember = async (teamId, nickname) => {
  let API = `/teams/${teamId}/registers/search?nickname=${nickname}`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const deleteMember = async (teamId, registerId) => {
  let API = `/teams/registers/${registerId}`
  const response = await axiosInstance.put(url + API)
}
////// 펫 관리 //////
export const getPet = async (teamId) => {
  let API = `/teams/${teamId}/pets`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const addPet = async (teamId, data) => {
  let API = `/teams/${teamId}/pets`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deletePet = async (petId) => {
  let API = `/teams/pets/${petId}`
  const response = await axiosInstance.delete(url + API)
}

export const changePetInfo = async (petId, data) => {
  let API = `/teams/pets/${petId}`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
