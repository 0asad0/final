const AppError = require("../utils/AppError");

const validateApi = (req, res, next) => {
  if (req.originalUrl === "/api/auth/login" && req.method === "POST") {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
  } else if (req.originalUrl === "/api/v1/users" && req.method === "POST") {
    const { userName, email, password } = req.body;

    if (password && password.length < 6) {
      return next(new AppError("Password must be greater the 6 ", 400));
    } else if (!userName || !email || !password) {
      return next(
        new AppError("Username, Email and Password are required", 400),
      );
    }
  } else if (req.originalUrl === "/api/v1/posts" && req.method === "POST") {
    const { title, body, author } = req.body;

    if (!title || !body || !author) {
      return next(
        new AppError("Post Title, Post Body and Author are required", 400),
      );
    }
  } else if (req.originalUrl.includes("comments") && req.method === "POST") {
    const { body, author, post } = req.body;

    if (!body || !post || !author) {
      return next(
        new AppError("Comment Body, Post and Author are required", 400),
      );
    }
  }

  next();
};

module.exports = validateApi;
