import axios from 'axios'
import { url } from '../Shared'
import axiosInstance from '../../utils/customAxios'

//////////////////////// main 화면 ////////////////////////
export const getUserInfo = async () => {
  let API = `/user`
  const response = await axiosInstance.get(url + API)
  return response.data
}

export const getTodoProgress = async (teamId) => {
  let API = `/teams/${teamId}/todos/progress`
  const response = await axiosInstance.get(url + API)
  return response.data.progress
}

export const getTeamList = async () => {
  let API = `/teams/name`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const getMyTodoList = async (teamId) => {
  let API = `/teams/${teamId}/todos`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const completeTodo = async (todoId) => {
  let API = `/teams/todos/${todoId}/assign/complete`
  let body = {}
  const response = await axiosInstance.put(url + API, body)
}

//////////////////////// 팀 참여 ////////////////////////

export const getSearchedTeam = async (accessToken, teamCode) => {
  let API = `/teams/codes/${teamCode}`
  const response = await axiosInstance.get(url + API)
  console.log(response.data)
  return response.data
}

export const postJoiningTeam = async (accessToken, teamCode) => {
  let API = `/teams/registers?todoTeamCode=${teamCode}`
  let body = {}
  const response = await axiosInstance.post(url + API, body)
}
//////////////////////// 팀 생성 ////////////////////////

export const getTeamCode = async (accessToken) => {
  let API = `/teams/codes/random`
  const response = await axiosInstance.get(url + API)
  return response.data.randomCode
}

export const postTeamInfo = async (accessToken, data) => {
  let API = `/teams`
  const response = await axiosInstance.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      //Accept: 'application/json',
    },
  })
}

export const getLatestTeam = async () => {
  let API = '/teams/latest'
  const response = await axiosInstance.get(url + API)
  return response.data
}
