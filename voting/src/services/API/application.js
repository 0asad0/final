import api from 'utils/api'
import { APPLICATION_ENDPOINT } from 'constants/APIConstants'

export const getCandidateApplications = async () => {
  try {
    const response = await api.get(APPLICATION_ENDPOINT)
    return response.data.applications
  } catch (error) {
    throw error
  }
}

export const updateApplicationStatus = async (userId, id, status) => {
  try {
    const response = await api.put(APPLICATION_ENDPOINT, {
      userId,
      id,
      status
    })
    return response
  } catch (error) {
    throw error
  }
}

export const postCandidateApplication = async ({ constituency, imageShow }) => {
  try {
    const result = await api.post(APPLICATION_ENDPOINT, {
      constituency,
      image: imageShow
    })
    return result
  } catch (error) {
    throw error
  }
}
