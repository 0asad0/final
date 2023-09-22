import React, { useEffect, useState } from 'react'
import { Button, Modal, ScrollView, Text, View } from 'react-native'

import { castVote } from 'services/API/voting'
import ElectionDetails from 'components/ElectionDetails'
import { fetchElectionDetails } from 'services/API/elections'
import { showToast } from 'utils/toast'

import styles from 'styles'

const ActiveElectionDetails = ({ route }) => {
  const { electionId } = route.params
  const [electionDetails, setElectionDetails] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [votes, setVotes] = useState()
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false)

  const fetchDetails = async () => {
    try {
      const response = await fetchElectionDetails(electionId)
      const data = response.data
      if (data && data.election) {
        setElectionDetails(data.election)

        const counter = {}
        data.voters?.forEach(item => {
          const candidateId = item.candidate.id
          counter[candidateId] = (counter[candidateId] || 0) + 1
        })

        setVotes(counter)
      }
    } catch (error) {
      showToast('Error Fetching Election Details')
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const handleConfirmVote = async () => {
    const result = await castVote(electionId, selectedCandidate)
    if (result?.status === 200) setConfirmationModalVisible(false)
    else showToast(result.data.message)
  }

  return (
    <ScrollView>
      {electionDetails ? (
        <ElectionDetails
          electionDetails={electionDetails}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={setSelectedCandidate}
          setConfirmationModalVisible={setConfirmationModalVisible}
          votes={votes}
        />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
      <Modal
        animationType='slide'
        transparent={true}
        visible={confirmationModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Confirm your vote?</Text>
            <Button
              color='#6854a4'
              title='Confirm'
              onPress={handleConfirmVote}
            />
            <Button
              color='#6854a4'
              title='Cancel'
              onPress={() => setConfirmationModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default ActiveElectionDetails
