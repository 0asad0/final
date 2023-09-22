import { PermissionsAndroid, ToastAndroid } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { check, PERMISSIONS } from 'react-native-permissions'

const MediaGallery = {
  checkPermission: async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    return result === 'granted'
  },

  requestPermission: async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Allow Gallery Access',
          message: "The app needs permission to access your device's gallery.",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (error) {
      ToastAndroid.show('Error Occured', ToastAndroid.SHORT)
      return false
    }
  },

  openMediaGallery: async () => {
    const permissionGranted = await MediaGallery.checkPermission()
    if (!permissionGranted) {
      const permissionRequested = await MediaGallery.requestPermission()
      if (!permissionRequested) {
        ToastAndroid.show('Gallery Permissions Denied', ToastAndroid.SHORT)
        return null
      }
    }

    const options = {
      mediaType: 'photo'
    }

    return new Promise(resolve => {
      launchImageLibrary(options, response => {
        resolve(response)
      })
    })
  }
}

export default MediaGallery
