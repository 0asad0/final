import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { ScrollView, Text } from 'react-native'
import UploadImage from 'components/UploadImage'

import addSchema from 'validations/constituencies'
import { postCandidateApplication } from 'services/API/application'
import styles from 'styles'
import { showToast } from 'utils/toast'

const CandidateApplication = ({ navigation }) => {
  const [constituency, setConstituency] = useState()
  const [imageShow, setImageShow] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleSubmit = async () => {
    try {
      const dataToValidate = {
        name: constituency,
        picture: imageShow
      }

      await addSchema.validate(dataToValidate, { abortEarly: false })
      const res = await postCandidateApplication({ constituency, imageShow })
      if (res?.status === 200) {
        showToast(res?.data.message)
        navigation.pop()
      } else showToast(res?.data.message)
    } catch (validationError) {
      const errorMessage = validationError.inner[0].message
      showToast(errorMessage)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={styles.title}>Application to be Candidate</Text>
      <TextInput
        label='Constituency'
        value={constituency}
        onChangeText={setConstituency}
        mode='outlined'
      />
      <UploadImage
        imageShow={imageShow}
        setImageShow={setImageShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Apply
      </Button>
    </ScrollView>
  )
}

export default CandidateApplication
