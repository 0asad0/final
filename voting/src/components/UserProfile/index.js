import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from 'styles'

const UserProfile = ({ item, handleUserPress }) => (
  <TouchableOpacity
    onPress={() => handleUserPress(item?._id)}
    style={styles.userList}
  >
    <Text style={{...styles.value, flex:1}}>{item?.username}</Text>
    <Text style={{...styles.value, flex:1}}>{item?.userType}</Text>
    <Text style={{...styles.value, flex:1}}>{item?.constituency?.name}</Text>
  </TouchableOpacity>
)

export default UserProfile
