import { url } from '../Shared'
////// 팀 정보 //////
export const getTeamInfo = async (accessToken, teamId) => {
  let API = `/teams/${teamId}`
  const response = await axiosInstance.get(url + API)
  return response.data
}

export const postTeamInfo = async (accessToken, teamId, data) => {
  let API = `/teams/${teamId}`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

////// 회원 관리 //////
export const getMember = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/registers/manage`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const changeAuthority = async (accessToken, teamId, registerId, authority) => {
  let API = `/teams/${teamId}/registers/${registerId}`
  let data = { authority: authority }
  const response = await axiosInstance.put(url + API, data)
}

export const searchMember = async (accessToken, teamId, nickname) => {
  let API = `/teams/${teamId}/registers/search`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

////// 펫 관리 //////
export const getPet = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/pets`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const addPet = async (accessToken, teamId, data) => {
  let API = `/teams/${teamId}/pets`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deletePet = async (accessToken, petId) => {
  let API = `/teams/pets/${petId}`
  const response = await axiosInstance.delete(url + API)
}

export const changePetInfo = async (accessToken, petId, data) => {
  let API = `/teams/pets/${petId}`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
