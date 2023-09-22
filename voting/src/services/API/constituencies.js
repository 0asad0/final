import api from 'utils/api'
import { CONSTITUENCY_ENDPOINT, USER_ENDPOINT } from 'constants/APIConstants'

export const addConstituency = async (name, picture) => {
  try {
    const result = await api.post(CONSTITUENCY_ENDPOINT, {
      name,
      picture
    })
    return result
  } catch (error) {
    throw error
  }
}

export const getConstituencies = async () => {
  try {
    const result = await api.get(CONSTITUENCY_ENDPOINT)
    return result.data
  } catch (error) {
    throw error
  }
}

export const updateUserConstituency = async (constituency, userId) => {
  try {
    const response = await api.put(
      `${USER_ENDPOINT}/${userId}/${CONSTITUENCY_ENDPOINT}`,
      {
        constituency: constituency
      }
    )
    return response
  } catch (error) {
    throw error
  }
}
