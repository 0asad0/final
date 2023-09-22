const JoiError = (error) => {
  const formatError =
    error.details[0].message.split(" ")[0].toUpperCase() +
    " " +
    error.details[0].message.split(" ").slice(1).join(" ");

  return formatError;
};

module.exports = JoiError;
