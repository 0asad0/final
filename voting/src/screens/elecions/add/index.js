import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { createElection } from 'services/API/elections'
import { showToast } from 'utils/toast'
import styles from 'styles'
import startSchema from 'validations/elections'

const StartElection = ({ navigation }) => {
  const [electionName, setElectionName] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [isEndTimeVisible, setEndTimeVisible] = useState(false)
  const [isStartTimeVisible, setStartTimeVisible] = useState(false)

  const handleStartTimeConfirm = date => {
    setStartTime(date.toISOString())
    setStartTimeVisible(false)
  }

  const handleEndTimeConfirm = date => {
    setEndTime(date.toISOString())
    setEndTimeVisible(false)
  }

  const handleStartElection = async () => {
    try {
      console.log(startTime)
      const electionData = {
        name: electionName,
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      }

      await startSchema.validate(electionData, { abortEarly: false })

      const result = await createElection(electionData)

      if (result.status === 200) {
        showToast(result?.data.message)
        navigation.pop()
      } else showToast(result?.data.message)
    } catch (validationError) {
      showToast(validationError.inner[0].message)
    }
  }

  return (
    <View style={styles.ScrollView}>
      <TextInput
        style={styles.input}
        placeholder='Election Name'
        value={electionName}
        onChangeText={setElectionName}
      />
      <View style={styles.flexContainer}>
        <Button
          color={'#6854a4'}
          title='Select Start Time'
          onPress={() => setStartTimeVisible(!isStartTimeVisible)}
        />
        <TextInput
          style={styles.input}
          placeholder='Start Time'
          value={startTime}
          editable={false}
        />
      </View>
      <DateTimePickerModal
        isVisible={isStartTimeVisible}
        mode='datetime'
        onConfirm={handleStartTimeConfirm}
        onCancel={() => setStartTimeVisible(!isStartTimeVisible)}
      />
      <View style={styles.flexContainer}>
        <Button
          color={'#6854a4'}
          title='Select End Time'
          onPress={() => setEndTimeVisible(!isEndTimeVisible)}
        />
        <TextInput
          style={styles.input}
          placeholder='End Time'
          value={endTime}
          editable={false}
        />
      </View>
      <DateTimePickerModal
        isVisible={isEndTimeVisible}
        mode='datetime'
        onConfirm={handleEndTimeConfirm}
        onCancel={() => setEndTimeVisible(!isEndTimeVisible)}
      />
      <Button
        color={'#6854a4'}
        title='Start Election'
        onPress={handleStartElection}
      />
    </View>
  )
}

export default StartElection
