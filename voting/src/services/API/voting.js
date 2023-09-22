import api from 'utils/api'
import { VOTE_ENDPOINT } from 'constants/APIConstants'

export const castVote = async (electionId, selectedCandidate) => {
  try {
    const result = await api.post(`${VOTE_ENDPOINT}/cast`, {
      electionId,
      selectedCandidate
    })
    return result
  } catch (error) {
    throw error
  }
}
