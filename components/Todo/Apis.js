import axiosInstance from '../../utils/customAxios'
import { url } from '../Shared'

export const deleteTodo = async (todoId) => {
  let API = `/teams/todos/${todoId}`
  const response = await axiosInstance.delete(url + API)
  console.log(response)
}
//정상작동됨
export const getTodoTeamList = async (page = 0, size = 20) => {
  let API = `/teams?page=${page}&size=${size}`
  const response = await axiosInstance.get(url + API)
  return response.data.content
  //response: [{"teamId": 1, "teamName": "test"}, {"teamId": 3, "teamName": "test"}, {"teamId": 6, "teamName": "test"}, {"teamId": 7, "teamName": "test"}]
}
export const getCategoryListAdmin = async (teamId) => {
  let API = `/teams/${teamId}/category/manage`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}
export const getCategoryList = async (teamId) => {
  let API = `/teams/${teamId}/category`
  const response = await axiosInstance.get(url + API)
  return response.data.content
}

export const getTeamUsers = async (data) => {
  let tempArr = []
  const promises = data.content.map(function (team) {
    //team = {"authority": "PRESIDENT", "registerPeriod": 1, "teamId": 7, "teamName": "test", "teamProfileImageUrl": "https://pawith.s3.ap-northeast-2.amazonaws.com/9ec9d1e9-ebde-4d59-b74d-b515b04c5d98.png"}
    tempArr.push(getTeamUser(team.teamId))
  })
  await Promise.all(promises)
}

export const getTeamUser = async (teamId) => {
  let API = `/teams/${teamId}/registers`
  const response = await axiosInstance.get(url + API)
  // console.log('getTeamUser: 52', response.data.content)getTeamUser: 52 [{"registerId": 2, "registerName": "김형석"}, {"registerId": 3, "registerName": "test"}, {"registerId": 4, "registerName": "neon"}, {"registerId": 16, "registerName": "test🌕"}, {"registerId": 20, "registerName": "주희이"}, {"registerId": 22, "registerName": "주희2"}, {"registerId": 23, "registerName": "심규민"}, {"registerId": 24, "registerName": "센"}, {"registerId": 31, "registerName": "신민선"}, {"registerId": 36, "registerName": "한수현"}, {"registerId": 39, "registerName": "아이러브엽떡"}, {"registerId": 40, "registerName": "한덩이"}, {"registerId": 46, "registerName": "김가연"}]
  return response.data.content
}

export const getTodos = async (categoryId, date) => {
  let API = `/teams/category/${categoryId}/todos`
  const response = await axiosInstance.get(url + API, {
    params: {
      moveDate: date,
    },
  })
  // console.log('response.data:', response.data.content[0]) //{"assignNames": [[Object], [Object]], "completionStatus": "INCOMPLETE", "task": "test1", "todoId": 6182},
  return response.data.content
}

export const completeTodo = async (todo) => {
  let API = `/teams/todos/${todo.todoId}/assign/complete`
  let data = { todoId: todo.todoId }
  try {
    const response = await axiosInstance.put(url + API, data)
    return response
  } catch (e) {
    console.log('completeTodo:', e)
  }
}
export const setTodoAlarm = async (todo, notificationTime) => {
  console.log(notificationTime)
  let API = `/teams/todos/${todo.todoId}/assign/notification?notificationTime=${notificationTime}`
  let data = { notificationTime }
  try {
    const response = await axiosInstance.post(url + API, data)
    return response
  } catch (e) {
    console.log('setTodoAlarm:', e)
  }
}

export const checkComplete = async (todoId) => {
  let API = `/teams/todos/${todoId}/completion`
  const response = await axiosInstance.get(url + API)
  console.log(response.data)
}
export const editTodoName = async (todoId, name) => {
  let API = `/teams/todos/${todoId}/description`
  let data = {
    description: name,
  }
  const response = await axiosInstance.put(url + API, data)
  return response
}

export const editTodoDate = async (todoId, scheduledDate) => {
  let API = `/teams/todos/${todoId}/date`
  let data = { scheduledDate: scheduledDate }
  const response = await axiosInstance.put(url + API, data)
  return response
}

export const getAssignedTodos = async (teamId, page = 0, size = 20) => {
  let API = `/teams/${teamId}/todos`
  const response = await axiosInstance.get(url + API, {
    params: {
      page,
      size,
    },
  })
  return response.data.content
}

export const getAlarms = async (page = 0, size = 20) => {
  let API = `/alarms?page=${page}&size=${size}`
  const response = await axiosInstance.get(url + API, {
    params: {
      page,
      size,
    },
  })
  return response.data.content
}
