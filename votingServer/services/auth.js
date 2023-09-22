const model = require("../models");
const signToken = require("../utils/signJWT");
const bcrypt = require('bcrypt')

const login = async ({ email, password }) => {
  try {
    const user = await model.user.findOne({ email });

    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error("Inavlid Email or Password");
    }

    const token = signToken(user);
    return { token, role: user.userType };
  } catch (error) {
    throw error;
  }
};

const signup = async ({
  username,
  email,
  password,
  imageShow,
  userType,
  cnic,
  isRegistered,
}) => {
  try {
    const existingUser = await model.user.findOne({ email });
    if (existingUser) {
      throw new Error("User Already Exists");
    }
    const newUser = new model.user({
      username,
      email,
      cnic,
      password: await bcrypt.hash(password,10),
      userType,
      isRegistered: isRegistered || false,
      profilePicture: imageShow,
    });

    await newUser.save();
    const token = signToken(newUser);
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = { login, signup };
