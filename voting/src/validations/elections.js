import * as yup from 'yup'

const startSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  startTime: yup
    .date()
    .required('Start Time is required')
    .typeError('Start Time must be a valid date')
    .test(
      'isFuture',
      'Start Time is required and must be in the future',
      startTime => {
        const now = new Date()
        return startTime > now
      }
    ),
  endTime: yup
    .date()
    .required('End Time is required')
    .typeError('End Time must be a valid date')
    .when('startTime', (startTime, schema) => {
      return schema.min(startTime, 'End Time must be greater than Start Time')
    })
})

export default startSchema
