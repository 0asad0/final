const model = require("../models");
const get = async () => {
  try {
    const currentDate = new Date();

    const elections = await model.elections
      .find({ })
      .populate("constituencies candidates");

    return elections;
  } catch (error) {
    throw error;
  }
};

const getDetails = async ({ id }) => {
  try {
    const election = await model.elections
      .findById(id)
      .populate("constituencies candidates");

    if (!election) {
      throw new Error("Election not found");
    }
    const voters = await model.voting.find({ election: id });

    return { election, voters };
  } catch (error) {
    throw error;
  }
};

const start = async ({ name, startTime, endTime }) => {
  try {
    const constituencies = await model.constituency.find({});
    const candidates = await model.user.find({ userType: "Candidate" });

    const newElection = new model.elections({
      name,
      startTime,
      endTime,
      constituencies: constituencies.map((constituency) => constituency._id),
      candidates: candidates.map((candidate) => candidate._id),
    });

    await newElection.save();

    return newElection;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const currentDate = new Date();

    const elections = await model.elections
      .find({
        startTime: { $lt: currentDate },
        endTime: { $gt: currentDate },
      })
      .populate("constituencies candidates")
      .exec();

    return elections;
  } catch (error) {
    throw error;
  }
};

module.exports = { get, getDetails, start, getActive };
