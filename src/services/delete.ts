import { type AxiosError, type AxiosResponse } from 'axios'
import axios from './axios'

export const deleteService = async (id: string): Promise<AxiosResponse | AxiosError> => {
  try {
    const response: AxiosResponse = await axios.delete(`api/v1/posts/${id}`)
    return response
  } catch (error) {
    return error as AxiosError
  }
}

export const deleteCommentService = async (postId: string, commentId: string, token: string | null): Promise<AxiosResponse | AxiosError> => {
  try {
    const response: AxiosResponse = await axios.delete(`api/v1/posts/${postId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token != null ? token : ''}`
      }
    })
    return response
  } catch (error) {
    return error as AxiosError
  }
}
