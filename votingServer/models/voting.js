const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  constituency: { type: mongoose.Schema.Types.ObjectId, ref: "Constituency" },
  votedAt: Date,
});

const Voting = mongoose.model("Voting", votingSchema);

module.exports = Voting;
