const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  userType: {
    type: String,
    enum: ["Admin", "Candidate", "Voter"],
    require: true,
  },
  profilePicture: String,
  constituency: { type: mongoose.Schema.Types.ObjectId, ref: "Constituency" },
  cnic: { type: String, require: true },
});



userSchema.methods.checkPassword = async function (
  userSignInPass,
  userOriginalPass,
) {
  return await bcrypt.compare(userSignInPass, userOriginalPass);
};

module.exports = mongoose.model("User", userSchema);
