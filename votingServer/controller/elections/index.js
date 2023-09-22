const services = require("../../services");
const AppError = require("../../utils/AppError");
const JoiError = require("../../utils/JoiError");
const validate = require("../../validations/elections");

const get = async (req, res, next) => {
  try {
    const elections = await services.elections.get();
    res.status(200).json(elections);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getDetails = async (req, res, next) => {
  try {
    const { error, value } = validate.getDetailsSchema.validate(req.params, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const { id } = req.params;

    const election = await services.elections.getDetails({ id });

    res.status(200).json(election);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const start = async (req, res, next) => {
  try {
    const { error, value } = validate.startSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const { name, startTime, endTime } = req.body;

    const newElection = await services.elections.start({
      name,
      startTime,
      endTime,
    });

    res.status(200).json({
      message: "Election created successfully",
      election: newElection,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const getActive = async (req, res, next) => {
  try {
    const elections = await services.elections.getActive();
    res.status(200).json(elections);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { get, getDetails, start, getActive };
