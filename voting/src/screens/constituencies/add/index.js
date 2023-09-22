import { Button } from 'react-native-paper'
import React, { useState } from 'react'
import {  Text, TextInput, View } from 'react-native'

import { addConstituency } from 'services/API/constituencies'
import { showToast } from 'utils/toast'
import addSchema from 'validations/constituencies'

import UploadImage from 'components/UploadImage'

import styles from 'styles'

const AddConstituency = ({ navigation }) => {
  const [constitution, setConstitution] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [imageShow, setImageShow] = useState()

  const handleAddConstitution = async () => {
    try {
      await addSchema.validate(
        {
          name: constitution,
          picture: imageShow
        },
        { abortEarly: false }
      )

      const result = await addConstituency(constitution, imageShow)

      if (result.status === 200) {
        showToast('Constituency created successfully')
        navigation.pop()
      } else {
        showToast('Cannot create Constituency')
      }
    } catch (validationError) {
      const errorMessage = validationError.inner[0].message
      showToast(errorMessage)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Constitution</Text>
      <TextInput
        style={styles.input}
        placeholder='Constitution Name'
        value={constitution}
        onChangeText={setConstitution}
      />
      <UploadImage
        imageShow={imageShow}
        setImageShow={setImageShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Button
        mode='contained'
        style={styles.button}
        onPress={handleAddConstitution}
      >
        Add Constitution
      </Button>
    </View>
  )
}

export default AddConstituency
