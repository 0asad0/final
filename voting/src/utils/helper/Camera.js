import { PermissionsAndroid, ToastAndroid } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import { check, PERMISSIONS } from 'react-native-permissions'

const Camera = {
  checkPermission: async () => {
    const result = await check(PERMISSIONS.ANDROID.CAMERA)
    return result === 'granted'
  },

  requestPermission: async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Allow Camera Access',
          message:
            'The voting machine app needs permission to access your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.SHORT)
      return false
    }
  },

  openCamera: async () => {
    const permissionGranted = await Camera.checkPermission()
    if (!permissionGranted) {
      const permissionRequested = await Camera.requestPermission()
      if (!permissionRequested) {
        ToastAndroid.show('Camera Permissions required', ToastAndroid.SHORT)
        return null
      }
    }

    const options = {
      mediaType: 'photo'
    }

    const image = await launchCamera(options, response => {
      return response
    })
    return image
  }
}

export default Camera
