const Joi = require("joi");

const startSchema = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref("startTime")).required(),
});

const getDetailsSchema = Joi.object({
  id: Joi.string().required(),
});
module.exports = {
  startSchema,
  getDetailsSchema,
};
