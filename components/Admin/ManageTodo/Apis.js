import { url } from '../../Shared'
import axiosInstance from '../../../utils/customAxios'

export const ToggleCategory = async (categoryId) => {
  let API = `/teams/category/${categoryId}`
  let data = {}
  const response = await axiosInstance.put(url + API, data)
  return response.status
}

export const EditCategoryName = async (categoryId, categoryName) => {
  let API = `/teams/category/${categoryId}/name`
  let data = {
    categoryName: categoryName,
  }
  const response = await axiosInstance.put(url + API, data)
  return response.status
}
export const CreateCategory = async (categoryName, teamId) => {
  console.log(categoryName, teamId)
  let API = `/teams/${teamId}/category`
  let data = {
    categoryName: categoryName,
  }
  const response = await axiosInstance.post(url + API, data)
  return response.status
}
export const DeleteCategory = async (categoryId) => {
  let API = `/teams/category/${categoryId}`
  const response = await axiosInstance.delete(url + API)
  return response.status
}
