import axios from 'axios'
import { url } from '../Shared'

//////////////////////// main 화면 ////////////////////////
export const getUserInfo = async (accessToken) => {
  let API = `/user`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data
}

export const getTodoProgress = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/todos/progress`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data.progress
}

export const getTeamList = async (accessToken) => {
  let API = `/teams/name`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data.content
}

export const getMyTodoList = async (accessToken, teamId) => {
  let API = `/teams/${teamId}/todos`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data.content
}

export const completeTodo = async (accessToken, todoId) => {
  let API = `/teams/todos/${todoId}/assign/complete`
  let body = {}
  const response = await axios.put(url + API, body, {
    headers: { Authorization: accessToken },
  })
}

//////////////////////// 팀 참여 ////////////////////////

export const getSearchedTeam = async (accessToken, teamCode) => {
  let API = `/teams/codes/${teamCode}`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  console.log(response.data)
  return response.data
}

export const postJoiningTeam = async (accessToken, teamCode) => {
  let API = `/teams/registers?todoTeamCode=${teamCode}`
  let body = {}
  const response = await axios.post(url + API, body, {
    headers: { Authorization: accessToken },
  })
}
//////////////////////// 팀 생성 ////////////////////////

export const getTeamCode = async (accessToken) => {
  let API = `/teams/codes/random`
  const response = await axios.get(url + API, {
    headers: { Authorization: accessToken },
  })
  return response.data.randomCode
}

export const postTeamInfo = async (accessToken, data) => {
  let API = `/teams`
  const response = await axios.post(url + API, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      //Accept: 'application/json',
      Authorization: accessToken,
    },
  })
}
