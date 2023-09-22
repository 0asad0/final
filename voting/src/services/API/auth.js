import api from 'utils/api'
import { AUTH_ENDPOINT } from 'constants/APIConstants'

export const handleLoginfunction = async ({ email, password }) => {
  try {
    const response = await api.post(`${AUTH_ENDPOINT}/login`, {
      email,
      password
    })
    return response
  } catch (error) {
    throw error
  }
}

export const handleSignupfunctions = async data => {
  try {
    const response = await await api.post(`${AUTH_ENDPOINT}/signup`, data)
    return response
  } catch (error) {
    throw error
  }
}
