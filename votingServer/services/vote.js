const model = require("../models");

const cast = async ({ electionId, selectedCandidate, userId }) => {
  try {
    const voter = await model.user.findById(userId);
    const candidate = await model.user.findById(selectedCandidate);

    if (
      voter.constituency._id.toString() !==
      candidate.constituency._id.toString()
    ) {
      throw new Error("Voter and candidate are not in the same constituency");
    }

    const existingRecord = await model.voting.findOne({
      election: electionId,
      voter: userId,
    });

    if (!existingRecord) {
      const newVotingEntry = new model.voting({
        election: electionId,
        voter: userId,
        candidate: selectedCandidate,
        constituency: voter.constituency,
        votedAt: new Date(),
      });
      await newVotingEntry.save();
      return newVotingEntry;
    } else {
      throw new Error("Voter has already cast a vote in this election");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { cast };
