import axios from 'axios'
import { url } from '../Shared'

export const createRandomCode = async (accessToken) => {
  let API = `/todo/team/code`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
//정상작동됨
export const getTodoTeamList = async (accessToken, page, size) => {
  let API = `/todo/team/list?page=${page}&size=${size}` //500
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}
export const getCategoryList = async (teamId, accessToken) => {
  let API = `/category/${teamId}`
  console.log(teamId, accessToken)
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.categories
}

export const getTeamUsers = async (data) => {
  let tempArr = []
  const promises = data.content.map(function (team) {
    //team = {"authority": "PRESIDENT", "registerPeriod": 1, "teamId": 7, "teamName": "test", "teamProfileImageUrl": "https://pawith.s3.ap-northeast-2.amazonaws.com/9ec9d1e9-ebde-4d59-b74d-b515b04c5d98.png"}
    tempArr.push(getTeamUser(team.teamId))
  })
  await Promise.all(promises)
}
//정상작동됨
export const getTeamUser = async (teamId, accessToken) => {
  let API = `/register/list?teamId=${teamId}`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}

export const getTodos = async (categoryId, accessToken) => {
  let API = `/todo/${categoryId}`
  const response = await axios.get(url + API, {
    params: {
      moveDate: '2023-10-18',
    },
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.todos
}

export const getAssignedTodos = async (teamId, accessToken, page = 0, size = 20) => {
  let API = `/todo/list/${teamId}`
  const response = await axios.get(url + API, {
    params: {
      page,
      size,
    },
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data.content
}
