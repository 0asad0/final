const services = require("../../services");
const AppError = require("../../utils/AppError");
const JoiError = require("../../utils/JoiError");
const validate = require("../../validations/vote");

const cast = async (req, res, next) => {
  try {
    const { error, value } = validate.castVoteSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const { electionId, selectedCandidate } = req.body;
    const userId = req.user.id;

    const result = await services.vote.cast({
      electionId,
      selectedCandidate,
      userId,
    });
    res.status(201).json({ message: "Vote cast successfully" });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { cast };
