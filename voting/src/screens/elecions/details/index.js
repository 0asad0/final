import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import { getElectionDetails } from 'services/API/elections'
import { showToast } from 'utils/toast'
import styles from 'styles'

const ElectionDetails = ({ route }) => {
  const [electionDetails, setElectionDetails] = useState(null)
  const [votes, setVotes] = useState()

  const { electionId } = route.params

  const fetchDetails = async () => {
    try {
      const data = await getElectionDetails(electionId)

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
      showToast('Error occurred')
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <ScrollView>
      {electionDetails ? (
        <>
          <View style={styles.container}>
            <Text style={styles.label}>Election Name:</Text>
            <TextInput
              style={styles.input}
              value={electionDetails.name}
              editable={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Start Time:</Text>
            <TextInput
              style={styles.input}
              value={new Date(electionDetails.startTime).toLocaleString()}
              editable={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>End Time:</Text>
            <TextInput
              style={styles.input}
              value={new Date(electionDetails.endTime).toLocaleString()}
              editable={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Constituencies:</Text>
            {electionDetails?.constituencies?.map((constituency, index) => (
              <Text key={index} style={styles.value}>
                •{constituency.name}
              </Text>
            ))}
          </View>

          <View
            style={{
              ...styles.flexContainer,
              flexDirection: 'column',
              padding: '5%'
            }}
          >
            <View
              style={{
                ...styles.flexContainer,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.label}>Candidates </Text>
              <Text style={styles.label}>Votes </Text>
            </View>
            {electionDetails?.candidates?.map((candidate, index) => (
              <View
                style={{
                  ...styles.flexContainer,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text key={index} style={styles.value}>
                  {candidate.username}
                </Text>
                <Text key={index} style={styles.value}>
                  {votes?.[candidate.id] ?? 0}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.label}>Loading...</Text>
      )}
    </ScrollView>
  )
}

export default ElectionDetails
