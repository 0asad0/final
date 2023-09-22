import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { handleSignupfunctions } from 'services/API/auth'
import { showToast } from 'utils/toast'
import UploadImage from 'components/UploadImage'
import { USER_DETAILS } from 'constants/variable'
import { userValidationSchema } from 'validations/auth'

import styles from 'styles'

const Signup = () => {
  const [imageShow, setImageShow] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    userType: 'Voter',
    cnic: ''
  })

  const navigation = useNavigation()

  const handleChange = (key, text) => {
    setUser({ ...user, [key]: text })
  }

  const handleSignup = async () => {
    try {
      await userValidationSchema.validate(
        { ...user, image: imageShow },
        { abortEarly: false }
      )
      const result = await handleSignupfunctions({
        cnic: user.cnic,
        email: user.email,
        image: imageShow,
        password: user.password,
        username: user.username,
        userType: user.userType
      })

      if (result.status === 200) {
        showToast(result.data.message)
        navigation.navigate('Login')
      } else {
        showToast(result.data.message)
      }
    } catch (validationError) {
      showToast(validationError.inner[0].message)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      <Text style={styles.title}>Create Account</Text>
      <UploadImage
        imageShow={imageShow}
        setImageShow={setImageShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      {USER_DETAILS.map(key => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>{key.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={user[key]}
            onChangeText={text => handleChange(key, text)}
            secureTextEntry={key === 'password'}
            disabled={key === 'userType'}
          />
        </View>
      ))}
      <Button mode='contained' onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
    </ScrollView>
  )
}

export default Signup
