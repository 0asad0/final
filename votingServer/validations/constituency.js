const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  picture: Joi.string().uri().required(),
});

module.exports = { addSchema };
