import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'

import { fetchActiveElections } from 'services/API/elections'
import { showToast } from 'utils/toast'

import styles from 'styles'

const ActiveElections = ({ navigation }) => {
  const [electionData, setElectionData] = useState([])

  const fetchElections = async () => {
    try {
      const result = await fetchActiveElections()
      if (result && result.data && result.data.length > 0)
        setElectionData(result.data)
    } catch (error) {
      showToast('Error fetching Elections')
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchElections()
    })
    return unsubscribe
  }, [navigation])

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      {electionData.length > 0 ? (
        electionData?.map((election, index) => (
          <TouchableOpacity
            key={index}
            style={styles.electionCard}
            onPress={() =>
              navigation.navigate('Election Details', {
                electionId: election._id
              })
            }
          >
            <Text style={styles.title}>{election.name}</Text>
            <Text style={styles.label}>Start Time:</Text>
            <Text style={styles.text}>
              {new Date(election.startTime).toISOString()}
            </Text>
            <Text style={styles.label}>End Time:</Text>
            <Text style={styles.text}>
              {new Date(election.endTime).toISOString()}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  )
}

export default ActiveElections
