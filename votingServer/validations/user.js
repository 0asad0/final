const Joi = require("joi");

const getProfileSchema = Joi.object({
  id: Joi.string().optional(),
});

const updateProfilePictureSchema = Joi.object({
  cloudinaryUrl: Joi.string().required(),
});

const updateConstituencySchema = Joi.object({
  id: Joi.string().required(),
  constituency: Joi.object().required(),
});

const registrationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  imageShow: Joi.string().uri().required(),
  userType: Joi.string().valid("Voter", "Candidate", "Admin").required(),
  cnic: Joi.string()
    .pattern(/^\d{5}-\d{7}-\d{1}$/)
    .required(),
  isRegistered: Joi.boolean().required(),
});

module.exports = {
  getProfileSchema,
  updateProfilePictureSchema,
  updateConstituencySchema,
  registrationSchema,
};
