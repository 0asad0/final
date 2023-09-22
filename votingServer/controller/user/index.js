const services = require("../../services");
const AppError = require("../../utils/AppError");
const JoiError = require("../../utils/JoiError");
const validate = require("../../validations/user");

const getProfile = async (req, res, next) => {
  try {
    const { error, value } = validate.getProfileSchema.validate(req.params, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const userId = req.params.id || req.user.id;

    const user = await services.user.getProfile({ userId });
    res.status(200).json({ user });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const get = async (req, res, next) => {
  try {
    const { userType } = req.user;
    const users = await services.user.get({ userType });
    res.status(200).json({ users });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const { error, value } = validate.updateProfilePictureSchema.validate(
      req.params,
      {
        errors: { label: "key", wrap: { label: false } },
      },
    );
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const userId = req.user.id;

    const { cloudinaryUrl } = req.params;

    const user = await services.user.updateProfilePicture({
      cloudinaryUrl,
      userId,
    });
    res
      .status(200)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const updateConstituency = async (req, res, next) => {
  try {
    const { error, value } = validate.updateConstituencySchema.validate(
      {
        id: req.params.id,
        constituency: req.body.constituency,
      },
      {
        errors: { label: "key", wrap: { label: false } },
      },
    );
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const { id } = req.params;
    const { constituency } = req.body;

    const user = await services.user.updateConstituency({ constituency, id });
    res
      .status(200)
      .json({ message: "Constituency updated successfully", user });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      imageShow,
      userType,
      cnic,
      isRegistered,
    } = req.body;

    const { error, value } = validate.registrationSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const user = await services.user.register({
      username,
      email,
      password,
      imageShow,
      userType,
      cnic,
      isRegistered,
    });
    res.status(200).json({ message: "UserRegistered", user });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  updateProfilePicture,
  getProfile,
  get,
  updateConstituency,
  registerUser,
};
