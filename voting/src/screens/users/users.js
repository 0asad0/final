import React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import useGetUsers from 'hooks/useGetUsers'
import UserProfile from 'components/UserProfile'

import styles from 'styles'

const Users = ({ navigation }) => {
  const users = useGetUsers(navigation)

  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.candidateItem, justifyContent: 'space-between' }}
      >
        <Text style={styles.label}>Name</Text>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.label}>Constituency</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <UserProfile
            item={item}
            handleUserPress={() =>
              navigation.navigate('ProfileScreen', {
                userId: item._id
              })
            }
          />
        )}
      />
    </View>
  )
}

export default Users
