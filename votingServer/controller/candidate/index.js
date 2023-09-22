const services = require("../../services");
const AppError = require("../../utils/AppError");

const get = async (req, res, next) => {
  try {
    const candidates = await services.candidate.get();
    res.json(candidates);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { get };
