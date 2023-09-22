const model = require("../models");

const get = async () => {
  try {
    const constituencies = await model.constituency.find({}, "name picture");
    return constituencies;
  } catch (error) {
    throw error;
  }
};

const add = async ({ name, picture }) => {
  try {
    const existingConstituency = await model.constituency.findOne({ name });
    if (existingConstituency) {
      throw new Error("Constituency with the same name already exists.");
    }

    const newConstituency = new model.constituency({
      name,
      picture,
    });

    await newConstituency.save();
    return newConstituency;
  } catch (error) {
    throw error;
  }
};

module.exports = { get, add };
