import axios from 'axios'
import { url } from '../../Shared'

export const ToggleCategory = async (categoryId, accessToken) => {
  console.log(categoryId)
  let API = `/teams/category/${categoryId}`
  let data = {}
  const response = await axios.put(url + API, data, {
    headers: {
      Authorization: accessToken,
    },
  })
  console.log(response.status)
}

export const EditCategoryName = async (categoryId, accessToken, categoryName) => {
  let API = `/teams/category/${categoryId}/name`
  let data = {
    categoryName: categoryName,
  }
  const response = await axios.put(url + API, data, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.status
}
export const CreateCategory = async (categoryName, teamId, accessToken) => {
  console.log(categoryName, teamId, accessToken)
  let API = `/teams/${teamId}/category`
  let data = {
    categoryName: categoryName,
  }
  const response = await axios.post(url + API, data, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.status
}
export const DeleteCategory = async (categoryId, accessToken) => {
  let API = `/teams/category/${categoryId}`
  const response = await axios.delete(url + API, {
    headers: {
      Authorization: accessToken,
    },
  })
  return response.status
}
