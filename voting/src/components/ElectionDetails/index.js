import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import Votes from './Votes';
import styles from 'styles';

const ElectionDetails = ({
  electionDetails,
  selectedCandidate,
  setSelectedCandidate,
  setConfirmationModalVisible,
  votes
}) => {
  const handleCandidateSelection = candidateId => {
    setSelectedCandidate(candidateId)
    setConfirmationModalVisible(true)
  }

  return (
    <>
      <View>
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
          {electionDetails.constituencies.map((constituency, index) => (
            <Text key={index} style={styles.value}>
              {constituency.name}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Candidates: {'  '} Votes</Text>
        {electionDetails.candidates.map((candidate, index) => (
          <Votes
            key={index}
            candidate={candidate}
            handleCandidateSelection={handleCandidateSelection}
            selectedCandidate={selectedCandidate}
            candidateId={votes?.[candidate.id]?? 0}
          />
        ))}
      </View>
    </>
  )
}

export default ElectionDetails
