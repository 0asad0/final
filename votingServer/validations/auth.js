const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
  userType: Joi.string().valid("Candidate", "Voter").required(),
  cnic: Joi.string().optional(),
  isRegistered: Joi.boolean().optional(),
});

module.exports = { loginSchema, signupSchema };
