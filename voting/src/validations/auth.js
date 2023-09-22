import * as yup from 'yup'

export const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('USERNAME is required')
    .matches(/^[A-Za-z]+$/, 'USERNAME cannot contain numbers'),
  email: yup
    .string()
    .required('EMAIL is required')
    .matches(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
      'Invalid EMAIL'
    ),
  password: yup
    .string()
    .required('PASSWORD is required')
    .min(6, 'PASSWORD must be at least 6 characters'),
  userType: yup
    .string()
    .required('USERTYPE is required')
    .oneOf(['Admin', 'Candidate', 'Voter'], 'Invalid USERTYPE'),
  image: yup
    .string()
    .required('IMAGE is required')
    .url('Invalid URL format for profile picture'),
  cnic: yup
    .string()
    .required('CNIC is required')
    .matches(
      /^\d{5}-\d{7}-\d{1}$/,
      'Invalid CNIC format. Example: 12345-1234567-1'
    )
})

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('EMAIL is required')
    .matches(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
      'Invalid EMAIL'
    ),
  password: yup
    .string()
    .required('PASSWORD is required')
    .min(6, 'PASSWORD must be at least 6 characters')
})
