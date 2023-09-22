const services = require("../../services");
const AppError = require("../../utils/AppError");
const JoiError = require("../../utils/JoiError");
const validate = require("../../validations/application");

const apply = async (req, res, next) => {
  try {
    const { error, value } = validate.candidateApplicationSchema.validate(
      req.body,
      {
        errors: { label: "key", wrap: { label: false } },
      },
    );
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }

    const userId = req.user.id;
    const { constituency, image } = req.body;
    const result = await services.constituency.add({
      name: constituency,
      picture: image,
    });

    const constituencyId = result.id;
    const candidate = await services.application.applyCandidate({
      userId,
      constituency: constituencyId,
    });

    return res.status(200).json({
      message: "Candidate Application created successfully",
      candidate,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const get = async (req, res, next) => {
  try {
    const applications = await services.application.get();
    res.status(200).json({ applications });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const changeStatus = async (req, res, next) => {
  try {
    const { userId, id, status } = req.body;
    const { error, value } = validate.applicationApprovalSchema.validate(
      req.body,
      {
        errors: { label: "key", wrap: { label: false } },
      },
    );
    if (error) {
      return next(new AppError(JoiError(error), 400));
    }
    const applications = await services.application.changeStatus({
      userId,
      id,
      status,
    });
    res.status(200).json({ applications });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
module.exports = {
  apply,
  get,
  changeStatus,
};
