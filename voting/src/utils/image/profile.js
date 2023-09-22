import api from './api'

const uploadImage = async imageData => {
  const formData = new FormData()
  formData.append('image', {
    uri: imageData.uri,
    type: 'image/jpeg',
    name: 'image.jpg'
  })

  const response = await api.post('image/profile', formData, true)

  if (response.status === 200) {
    ToastAndroid.show('Image Uploaded', ToastAndroid.SHORT)
  } else {
    ToastAndroid.show('Error uploading', ToastAndroid.SHORT)
  }
}
