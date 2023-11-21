import axios from 'axios'
import { url } from '../Shared'
import axiosInstance from '../../utils/customAxios'

export const getUserInfo = async (accessToken) => {
  let API = `/user`
  const response = await axiosInstance.get(url + API)
  return response.data
}

export const getTeamList = async (accessToken) => {
  const page = 0
  const size = 10000
  let API = `/teams?page=${page}&size=${size}`
  const response = await axiosInstance.get(url + API, {
    params: { page, size },
  })
  return response.data.content
}

/////// 정보 수정 //////
export const changeProfileImage = async (accessToken, routeData) => {
  let API = '/user'
  const response = await axiosInstance.post(url + API, routeData, {
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  })
}

export const changeNickname = async (accessToken, nickName) => {
  let API = '/user/name'
  let data = { nickname: nickName }
  const response = await axiosInstance.put(url + API, data)
}

/////// 팀 탈퇴 //////
export const deleteTeam = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/registers`
  let data = {}
  const response = await axiosInstance.delete(url + API, data)
  console.log(`${teamId} 삭제`)
}

export const getAllTodoList = async (accessToken, teamId, page) => {
  let API = `/teams/${teamId}/todos/withdraw`
  const response = await axiosInstance.get(url + API, {
    params: {
      page: page,
      size: 5,
    },
  })
  return response.data.content
}

export const getTodoNum = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/todos/withdraw/count`
  const response = await axiosInstance.get(url + API)
  return response.data.todoCount
}

////// 계정 탈퇴 //////
export const getAllTeams = async (accessToken) => {
  let API = `/teams/withdraw`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const getAllTodos = async (accessToken, page) => {
  let API = `/teams/todos/withdraw?page=${page}&size=10`
  const response = await axiosInstance.get(url + API, {
    params: {
      page: page,
      size: 4,
    },
  })
  return response.data.content
}

export const getAllTodoNum = async (accessToken) => {
  let API = `/teams/todos/withdraw/count`
  const response = await axiosInstance.get(url + API)
  return response.data.todoCount
}

export const deleteAccount = async (accessToken) => {
  let API = `/user`
  const response = await axiosInstance.delete(url + API)
  console.log('탈퇴')
}

export const postReason = async (accessToken, data) => {
  let API = '/user/withdraw'
  let reason = { reason: data }
  const response = await axiosInstance.post(url + API, reason)
}

export const countDate = async (accessToken) => {
  let API = '/user/term'
  const response = await axiosInstance.get(url + API)
  return response.data.joinTerm
}
