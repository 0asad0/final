const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  constituencies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Constituency" },
  ],
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Election = mongoose.model("Election", electionSchema);

module.exports = Election;
