import api from 'utils/api'
import { showToast } from 'utils/toast'
import { ELECTIONS_ENDPOINT } from 'constants/APIConstants'

export const createElection = async electionData => {
  try {
    const result = await api.post(ELECTIONS_ENDPOINT, electionData)
    return result
  } catch (error) {
    throw error
  }
}

export const getElections = async setElectionData => {
  try {
    const result = await api.get(ELECTIONS_ENDPOINT)
    if (result && result.data && result.data.length > 0) {
      setElectionData(result.data)
    }
  } catch (error) {
    showToast('Error Fetching elections')
  }
}

export const getElectionDetails = async electionId => {
  try {
    const response = await api.get(`${ELECTIONS_ENDPOINT}/${electionId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchElectionDetails = async electionId => {
  try {
    const response = await api.get(`${ELECTIONS_ENDPOINT}/${electionId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const fetchActiveElections = async () => {
  try {
    const response = await api.get(`${ELECTIONS_ENDPOINT}/active`)
    return response
  } catch (error) {
    throw error
  }
}
