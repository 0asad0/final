import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import { imageUploadApi } from 'services/cloudinary/imageupload';
import { showToast } from 'utils/toast';
import styles from 'styles';


const { height } = Dimensions.get('window')

const UploadImage = ({
  imageShow,
  setImageShow,
  selectedImage,
  setSelectedImage
}) => {
  const [actionBarVisible, setActionBarVisible] = useState(false)

  const actionBarHeight = new Animated.Value(0)

  const loadImage = async () => {
    const res = await imageUploadApi(selectedImage)
    if (res) setImageShow(res)
  }

  useEffect(() => {
    loadImage()
  }, [selectedImage])

  const toggleActionBar = () => {
    if (actionBarVisible) {
      Animated.timing(actionBarHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => setActionBarVisible(false))
    } else {
      Animated.timing(actionBarHeight, {
        toValue: height * 0.3,
        duration: 300,
        useNativeDriver: false
      }).start(() => setActionBarVisible(true))
    }
  }

  const handleImagePicker = (source = {}) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      ...source
    }

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const formData = new FormData()
        formData.append('file', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName
        })
        setSelectedImage(formData)
      }
    })

    toggleActionBar()
  }

  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then(image => {
        if (image && image.path) {
          const formData = new FormData()
          formData.append('file', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').slice(-1)[0]
          })
          setSelectedImage(formData)
        } else
          showToast(
            'Image capture failed or returned an undefined image object'
          )
      })
      .catch(error => {
        showToast('Error occurred while capturing the image')
        console.error('Error:', error)
      })
    toggleActionBar()
  }

  return (
    <>
      <TouchableOpacity onPress={toggleActionBar} style={styles.uploadButton}>
        {imageShow ? (
          <Image
            source={{ uri: imageShow ?? null }}
            style={styles.profilePicture}
          />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </TouchableOpacity>
      <Animated.View style={[styles.actionBar, { height: actionBarHeight }]}>
        <TouchableOpacity
          onPress={() => handleImagePicker({})}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>Pick Image from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCameraPicker({})}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleActionBar} style={styles.optionButton}>
          <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

export default UploadImage
