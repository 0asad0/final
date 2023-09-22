import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import { ScrollView, Share, Text, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { registerUser } from 'services/API/users'
import { showToast } from 'utils/toast'
import UploadImage from 'components/UploadImage'
import { USER_DETAILS } from 'constants/variable'

import styles from 'styles'
import { userValidationSchema } from 'validations/auth'

const Register = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: '',
    cnic: ''
  })
  const [items, setItems] = useState([
    { label: 'Voter', value: 'Voter' },
    { label: 'Candidate', value: 'Candidate' }
  ])

  const [imageShow, setImageShow] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleRegister = async () => {
    try {
      await userValidationSchema.validate(
        { ...formData, image: imageShow, userType: data },
        { abortEarly: false }
      )

      const user = {
        ...formData,
        imageShow: imageShow,
        isRegistered: false,
        userType: data
      }
      const result = await registerUser(user)
      if (result?.status === 200) {
        showToast('User Registered')
        await onShare()
      } else showToast(result?.data.message)
    } catch (validationError) {
      showToast(validationError.inner[0].message)
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Your credentials for voting App are:\n 
        Email: ${formData.email}
        Password: ${formData.password}`
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) showToast('success')
        else showToast('share Cancelled')
      }
    } catch (error) {
      showToast('Can not share')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      <UploadImage
        imageShow={imageShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setImageShow={setImageShow}
      />
      {USER_DETAILS.map(key => {
        if (key === 'userType') return null
        const displayValue = formData[key]
        return (
          <View key={key}>
            <Text style={styles.label}>{key.toUpperCase()}</Text>
            <TextInput
              style={styles.input}
              value={displayValue}
              onChangeText={text => handleChange(key, text)}
              secureTextEntry={key === 'password'}
            />
          </View>
        )
      })}
      <DropDownPicker
        style={styles.input}
        textStyle={{ color: '#6854a4', fontWeight: 'bold' }}
        open={open}
        value={data}
        items={items}
        setOpen={setOpen}
        setValue={setData}
        setItems={setItems}
      />
      <Button mode='contained' style={styles.button} onPress={handleRegister}>
        Register
      </Button>
    </ScrollView>
  )
}

export default Register
