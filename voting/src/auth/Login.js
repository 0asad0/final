import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, TextInput } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { handleLoginfunction } from 'services/API/auth'
import { loginValidationSchema } from 'validations/auth'
import { showToast } from 'utils/toast'

import styles from 'styles'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation({ navigation })

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) navigation.navigate('App')
  }

  const handleLogin = async () => {
    try {
      await loginValidationSchema.validate(
        { email, password },
        { abortEarly: false }
      )
      const result = await handleLoginfunction({ email, password })
      if (result.status === 200) {
        await AsyncStorage.setItem('token', result.data.token)
        await AsyncStorage.setItem('role', result.data.role)
        navigation.navigate('App')
      } else showToast(result?.data.message)
    } catch (validationError) {
      showToast(validationError.inner[0].message)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('assets/logo.png')} style={styles.logo} />
      <TextInput
        label='EMAIL'
        value={email}
        onChangeText={text => setEmail(text)}
        mode='outlined'
      />
      <TextInput
        label='PASSWORD'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        mode='outlined'
      />
      <Button mode='contained' onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Text style={styles.signupText}>
        Don't have an account?
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupButton}
        >
          Sign up
        </Text>
      </Text>
    </View>
  )
}

export default Login
