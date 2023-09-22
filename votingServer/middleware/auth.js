const jwt = require("jsonwebtoken");
const models = require("../models");
const AppError = require("../utils/AppError");

const authenticateToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are Not Logged In. Please Login First", 401));
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return next(new AppError("jwt malformed", 401));
  }
  const freshUser = await models.user.findById(decodedToken.user._id);
  if (!freshUser) {
    return next(
      new AppError("Token Belonging to this user, do not exist now", 401),
    );
  }

  req.user = freshUser;
  next();
};

module.exports = authenticateToken;
