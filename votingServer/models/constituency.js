const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
});

module.exports = mongoose.model("Constituency", constituencySchema);
