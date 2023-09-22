import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, TextInput } from 'react-native-paper'
import { View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ROLES } from 'constants/variable'
import { fetchUserProfile } from 'services/API/users'
import styles from 'styles'

const ProfileScreen = ({ navigation, route }) => {
  const [role, setRole] = useState()
  const [userData, setUserData] = useState({
    email: '',
    constituency: '',
    cnic: '',
    profilePicture: '',
    username: '',
    userType: ''
  })

  const fetchUser = async () => {
    const id = route.params?.userId
    try {
      const response = await fetchUserProfile(id)
      if (response.status === 200) setUserData(response.data.user)
    } catch (error) {
      console.error('Error 404: User not found')
    }

    const userRole = await AsyncStorage.getItem('role')
    setRole(userRole)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser()
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      {userData.profilePicture && (
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profilePicture}
        />
      )}
      {role === ROLES.admin && userData.userType !== ROLES.admin && (
        <Button
          mode='contained'
          style={styles.button}
          onPress={() =>
            navigation.navigate('Constituencies', { id: route.params?.userId })
          }
        >
          Change Constituency
        </Button>
      )}
      {role === ROLES.voter && !route.params?.userId && (
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => navigation.navigate('CandidateApplication')}
        >
          Apply to be candidate
        </Button>
      )}
      {['username', 'email', 'userType', 'constituency', 'cnic'].map(key => {
        const displayValue =
          key === 'constituency' ? userData[key]?.name : userData[key]
        return (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <TextInput
              style={styles.input}
              value={displayValue}
              onChangeText={text =>
                setUserData(prevData => ({ ...prevData, [key]: text }))
              }
              editable={false}
            />
          </View>
        )
      })}
    </View>
  )
}

export default ProfileScreen
