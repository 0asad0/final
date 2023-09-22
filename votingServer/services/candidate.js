const model = require("../models");

const get = async () => {
  try {
    const candidates = await model.user
      .find({ userType: "Candidate" })
      .populate("constituency");
    return candidates;
  } catch (error) {
    throw error;
  }
};

module.exports = { get };
