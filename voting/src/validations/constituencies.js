import * as yup from 'yup'

const addSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  picture: yup
    .string()
    .required('Picture is required')
    .url('Picture must be a valid URL')
})

export default addSchema
