import { CLOUDINARY_URL } from '@env'
import { showToast } from 'utils/toast'

export const imageUploadApi = async selectedImage => {
  if (selectedImage) {
    const formData = new FormData()
    formData.append('file', selectedImage._parts[0][1])
    formData.append('upload_preset', 'zhcviypj')
    try {
      const response = await fetch(`${CLOUDINARY_URL}`, {
        method: 'POST',
        body: formData
      })

      const responseData = await response.json()
      const cloudinaryUrl = responseData.secure_url
      return cloudinaryUrl
    } catch (error) {
      showToast('Error occured')
    }
  }
}
