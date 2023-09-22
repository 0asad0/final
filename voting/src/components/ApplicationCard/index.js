import React from 'react'
import { Button } from 'react-native-paper'
import { Text, View } from 'react-native'

import { APPLICATION_STATUS } from 'constants/variable'
import styles from 'styles'

const ApplicationCard = ({ handleStatus, data }) => (
  <View
    style={{
      ...styles.flexContainer,
      borderWidth: 1,
      padding: 20,
      borderColor: '#666'
    }}
  >
    <View style={{ flex: 1 }}>
      <Text style={styles?.user}>User: {data?.user?.username}</Text>
      <Text style={styles?.constituency}>
        Constituency: {data?.constituency.name}
      </Text>
      <Text style={styles?.approvalStatus}>
        Approval Status: {data?.approvalStatus}
      </Text>
    </View>
    <View style={styles?.flexContainer}>
      <Button
        style={styles?.button}
        mode='contained'
        onPress={() =>
          handleStatus(data?.user._id, data?._id, APPLICATION_STATUS.approved)
        }
      > 
        Approve
      </Button>
      <Button
        style={styles?.button}
        mode='contained'
        onPress={() =>
          handleStatus(data?.user._id, data?._id, APPLICATION_STATUS.rejected)
        }
      >
        Reject
      </Button>
    </View>
  </View>
)

export default ApplicationCard
