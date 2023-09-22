const services = require('../../services')
const validate = require('../../validations/auth')
const AppError = require('../../utils/AppError')
const JoiError = require('../../utils/JoiError')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
  try {
    const { error, value } = validate.loginSchema.validate(req.body)
    if (error) {
      return next(new AppError(error.details[0].message, 400))
    }

    const { email, password } = req.body

    const { token, role } = await services.auth.login({ email, password })

    res.status(200).json({ message: 'Login successful.', token, role })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

const signup = async (req, res, next) => {
  try {
    const { error, value } = validate.signupSchema.validate(req.body, {
      errors: { label: 'key', wrap: { label: false } },
    })
    if (error) {
      return next(new AppError(JoiError(error), 400))
    }

    const {
      username,
      email,
      password,
      imageShow,
      userType,
      cnic,
      isRegistered,
    } = req.body

    const token = await services.auth.signup({
      username,
      email,
      password: await bcrypt.hash(password, 12),
      imageShow,
      userType,
      cnic,
      isRegistered,
    })
    res.json({ message: 'User registered successfully.', token })
  } catch (error) {
    next(new AppError(error.message, 500))
  }
}

module.exports = { login, signup }
