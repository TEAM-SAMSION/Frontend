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

/////// 정보 수정 //////
export const changeProfileImage = async (accessToken, routeData) => {
  let API = '/user'
  const response = await axios.post(url + API, routeData, {
    headers: {
      'Content-Type': `multipart/form-data`,
      Authorization: accessToken,
    },
  })
}

export const changeNickname = async (accessToken, nickName) => {
  let API = '/user/name'
  let data = { nickname: nickName }
  const response = await axios.put(url + API, data, {
    headers: {
      Authorization: accessToken,
    },
  })
}

/////// 팀 탈퇴 //////
export const deleteTeam = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/registers`
  const response = await axios.delete(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  console.log(`${teamId} 삭제`)
}

export const getAllTodoList = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/todos/withdraw`
  const response = await axios.get(url + API, {
    params: {
      page: 0,
      size: 10000,
    },
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}

export const getTodoNum = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/todos/withdraw/count`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.todoCount
}

////// 계정 탈퇴 //////
export const getAllTeams = async (accessToken) => {
  let API = `/teams/withdraw`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}

export const getAllTodos = async (accessToken, page) => {
  let API = `/teams/todos/withdraw?page=${page}&size=10`
  const response = await axios.get(url + API, {
    params: {
      page: page,
      size: 10,
    },
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}

export const getAllTodoNum = async (accessToken) => {
  let API = `/teams/todos/withdraw/count`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.todoCount
}

export const deleteAccount = async (accessToken) => {
  let API = `/user`
  const response = await axios.delete(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  console.log('탈퇴')
}
