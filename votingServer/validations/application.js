const Joi = require("joi");

const candidateApplicationSchema = Joi.object({
  constituency: Joi.string().required(),
  image: Joi.string().required(),
  approvalStatus: Joi.string()
    .valid("Pending", "Approved", "Rejected")
    .default("Pending"),
});

const applicationApprovalSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = {
  candidateApplicationSchema,
  applicationApprovalSchema,
};
