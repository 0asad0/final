import AsyncStorage from '@react-native-async-storage/async-storage'
import { ROLES } from 'constants/variable'
import React, { useEffect, useState } from 'react'
import {  ScrollView, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'

import { getElections } from 'services/API/elections'
import styles from 'styles'

const Elections = ({ navigation }) => {
  const [electionData, setElectionData] = useState([])
  const [role, setRole] = useState([])

  const checkRole = async () => {
    const user = await AsyncStorage.getItem('role')
    setRole(user)
  }

  useEffect(() => {
    checkRole()
    const unsubscribe = navigation.addListener('focus', () => {
      getElections(setElectionData)
    })
    return unsubscribe
  }, [navigation])

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      {role === ROLES.admin && (
        <Button
          style={styles.button}
          mode='contained'
          onPress={() => navigation.navigate('Start Election')}
        >
          Create Election
        </Button>
      )}
      {!electionData ?? <Text>Loading...</Text>}
      {electionData?.map((election, index) => (
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
      ))}
    </ScrollView>
  )
}

export default Elections
