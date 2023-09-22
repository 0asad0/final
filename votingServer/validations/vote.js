const Joi = require("joi");

const castVoteSchema = Joi.object({
  electionId: Joi.string().required(),
  selectedCandidate: Joi.string().required(),
});

module.exports = {
  castVoteSchema,
};
