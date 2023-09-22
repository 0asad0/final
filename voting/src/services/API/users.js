import api from 'utils/api'
import { USER_ENDPOINT } from 'constants/APIConstants'

export const fetchUserProfile = async userId => {
  try {
    const response = await api.get(
      userId ? `${USER_ENDPOINT}/profile/${userId}` : `${USER_ENDPOINT}/profile`
    )
    return response
  } catch (error) {
    throw error
  }
}

export const fetchUsers = async () => {
  try {
    const response = await api.get(USER_ENDPOINT)
    return response
  } catch (error) {
    throw error
  }
}

export const registerUser = async ({
  username,
  email,
  password,
  imageShow,
  userType,
  cnic,
  isRegistered
}) => {
  try {
    const response = await api.post(USER_ENDPOINT, {
      username,
      email,
      password,
      imageShow,
      userType,
      cnic,
      isRegistered
    })
    return response
  } catch (error) {
    throw error
  }
}
