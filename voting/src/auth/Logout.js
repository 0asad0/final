import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import { showToast } from 'utils/toast'

const LogoutScreen = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.removeItem('token')
      .then(AsyncStorage.removeItem('role'))
      .then(() => navigation.navigate('Profile'))
      .then(() => navigation.navigate('Login'))
      .catch(() => showToast('Unable to logout'))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      logout()
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
    </View>
  )
}

export default LogoutScreen
