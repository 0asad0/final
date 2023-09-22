module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "error";

  res.status(err.statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};
