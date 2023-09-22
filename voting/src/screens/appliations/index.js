import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import ApplicationCard from 'components/ApplicationCard'

import { showToast } from 'utils/toast'
import styles from 'styles'
import {
  getCandidateApplications,
  updateApplicationStatus
} from 'services/API/application'

const CandidateApplicationsList = ({ navigation }) => {
  const [candidateApplications, setCandidateApplications] = useState()
  const [refresh, setRefresh] = useState()

  const fetchCandidateApplications = async () => {
    try {
      const response = await getCandidateApplications()
      setCandidateApplications(response.applications)
    } catch (error) {
      showToast(error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCandidateApplications()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    fetchCandidateApplications()
  }, [refresh])

  const handleStatus = async (userId, id, status) => {
    try {
      const response = await updateApplicationStatus(userId, id, status)
      if (response.status === 200) {
        setRefresh(old => old + 1)
        showToast('Response Submitted')
      } else showToast('Error Occurred')
    } catch (error) {
      showToast('Error Occurred')
    }
  }

  return (
    <View style={styles.container}>
      {candidateApplications ? null : (
        <Text style={styles.label}>No Applications</Text>
      )}
      <FlatList
        data={candidateApplications}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ApplicationCard
            key={item?.id}
            handleStatus={handleStatus}
            data={item}
          />
        )}
      />
    </View>
  )
}

export default CandidateApplicationsList
