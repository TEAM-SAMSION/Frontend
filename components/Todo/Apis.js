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
  // let API = `/teams/name`
  let API = `/teams?page=${page}&size=${size}` //500
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  //response: [{"teamId": 1, "teamName": "test"}, {"teamId": 3, "teamName": "test"}, {"teamId": 6, "teamName": "test"}, {"teamId": 7, "teamName": "test"}]
  return response.data
}
export const getCategoryList = async (teamId, accessToken) => {
  // console.log(teamId)
  let API = `/teams/${teamId}/category`
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
  // console.log('teamID:', teamId)
  let API = `/teams/${teamId}/registers`
  const response = await axios.get(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.data
}

export const getTodos = async (categoryId, accessToken, date) => {
  let API = `/teams/category/${categoryId}/todos`
  const response = await axios.get(url + API, {
    params: {
      moveDate: date,
    },
    headers: {
      Authorization: accessToken,
    },
  })
  // console.log('response.data.todos:', response.data.todos)//{"assignNames": [[Object], [Object]], "completionStatus": "INCOMPLETE", "task": "test1", "todoId": 6182},
  return response.data.todos
}

export const completeTodo = async (todoId, accessToken) => {
  console.log(todoId)
  let API = `/teams/todos/${todoId}/assign/complete`
  const response = await axios.put(
    url + API,
    { todoId: todoId },
    {
      headers: {
        Authorization: accessToken,
      },
    },
  )
  console.log(response)
  // return response
}
export const getAssignedTodos = async (teamId, accessToken, page = 0, size = 20) => {
  let API = `/teams/${teamId}/todos`

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
