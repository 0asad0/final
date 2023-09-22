import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '@env'

const request = async (method, url, data, isMultipart = false) => {
  const headers = {
    Authorization: `JWT ${await AsyncStorage.getItem('token')}`
  }

  if (isMultipart) headers['Content-Type'] = 'multipart/form-data'
  else headers['Content-Type'] = 'application/json'

  try {
    const response = await axios({
      method,
      url: BASE_URL + url,
      data,
      headers
    })
    return response
  } catch (error) {
    return error.response
  }
}

const api = {
  get: url => request('get', url),
  post: (url, data, isMultipart = false) =>
    request('post', url, data, isMultipart),
  put: (url, data) => request('put', url, data),
  delete: url => request('delete', url)
}

export default api
