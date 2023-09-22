const services = require("../../services");
const AppError = require("../../utils/AppError");
const JoiError = require("../../utils/JoiError");
const validate = require("../../validations/constituency");

const get = async (req, res, next) => {
  try {
    const constituencies = await services.constituency.get();
    res.status(200).json(constituencies);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const add = async (req, res, next) => {
  try {
    const { error, value } = validate.addSchema.validate(req.body, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const { name, picture } = req.body;

    const response = await services.constituency.add({ name, picture });
    res.json({ message: "Constituency added successfully.", response });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { get, add };
