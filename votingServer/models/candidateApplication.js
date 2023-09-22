const mongoose = require("mongoose");

const candidateApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  constituency: { type: mongoose.Schema.Types.ObjectId, ref: "Constituency" },
  approvalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model(
  "CandidateApplication",
  candidateApplicationSchema,
);
