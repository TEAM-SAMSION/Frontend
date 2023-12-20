import axios from 'axios'
import { url } from '../Shared'
import axiosInstance from '../../utils/customAxios'

export const getUserInfo = async () => {
  let API = `/user`
  const response = await axiosInstance.get(url + API)
  return response.data
}

export const getTeamList = async () => {
  const page = 0
  const size = 10000
  let API = `/teams?page=${page}&size=${size}`
  const response = await axiosInstance.get(url + API, {
    params: { page, size },
  })
  return response.data.content
}

/////// 정보 수정 //////
export const changeProfileImage = async (routeData) => {
  let API = '/user'
  const response = await axiosInstance.post(url + API, routeData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
}

export const changeNickname = async (nickName) => {
  let API = '/user/name'
  let data = { nickname: nickName }
  const response = await axiosInstance.put(url + API, data)
}

/////// 팀 탈퇴 //////
export const deleteTeam = async (teamId) => {
  let API = `/teams/${teamId}/registers`
  let data = {}
  const response = await axiosInstance.delete(url + API, data)
  console.log(`${teamId} 삭제`)
}

export const getAllTodoList = async (teamId, page) => {
  let API = `/teams/${teamId}/todos/withdraw`
  const response = await axiosInstance.get(url + API, {
    params: {
      page: page,
      size: 5,
    },
  })
  return response.data.content
}

export const getTodoNum = async (teamId) => {
  let API = `/teams/${teamId}/todos/withdraw/count`
  const response = await axiosInstance.get(url + API)
  return response.data.todoCount
}

export const getTeamDeleteValidation = async (teamId) => {
  let API = `/teams/${teamId}/registers/validate`
  const response = await axiosInstance.post(url + API)
}

////// 계정 탈퇴 //////

export const getUserDeleteValidation = async () => {
  let API = `/teams/registers/validate`
  const response = await axiosInstance.post(url + API)
}

export const getAllTeams = async () => {
  let API = `/teams/withdraw`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const getAllTodos = async (page) => {
  let API = `/teams/todos/withdraw?page=${page}&size=10`
  const response = await axiosInstance.get(url + API, {
    params: {
      page: page,
      size: 4,
    },
  })
  return response.data.content
}

export const getAllTodoNum = async () => {
  let API = `/teams/todos/withdraw/count`
  const response = await axiosInstance.get(url + API)
  return response.data.todoCount
}

export const deleteAccount = async () => {
  let API = `/user`
  const response = await axiosInstance.delete(url + API)
  return response.status
}

export const postReason = async (data) => {
  let API = '/user/withdraw'
  let reason = { reason: data }
  const response = await axiosInstance.post(url + API, reason)
}

export const countDate = async () => {
  let API = '/user/term'
  const response = await axiosInstance.get(url + API)
  return response.data.joinTerm
}
