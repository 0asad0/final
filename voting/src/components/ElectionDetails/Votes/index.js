import React from 'react'
import { RadioButton } from 'react-native-paper'
import { View, Text } from 'react-native'

import styles from 'styles'

const Votes = ({
  candidate,
  handleCandidateSelection,
  selectedCandidate,
  candidateId
}) => (
  <View style={styles.candidateItem}>
    <RadioButton.Android
      value={candidate._id}
      status={selectedCandidate === candidate._id ? 'checked' : 'unchecked'}
      onPress={() => handleCandidateSelection(candidate._id)}
    />
    <Text style={styles.value}>
      {`${candidate.username}    ${candidateId}`}
    </Text>
  </View>
)

export default Votes
