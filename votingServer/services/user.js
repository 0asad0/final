const model = require("../models");
const bcrypt = require('bcrypt')

const get = async ({ userType }) => {
  try {
    let query;

    if (userType === "Admin") {
      query = model.user.find().populate("constituency").exec();
    } else {
      query = model.user
        .find({ userType: "Candidate" })
        .populate("constituency")
        .exec();
    }

    const users = await query;
    return users;
  } catch (error) {
    throw error;
  }
};

const getProfile = async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error("User not Found!");
    }

    const user = await model.user.findById(userId).populate("constituency");
    return user;
  } catch (error) {
    throw error;
  }
};

const updateProfilePicture = async ({ cloudinaryUrl, userId }) => {
  try {
    const user = await model.user.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = cloudinaryUrl;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const updateConstituency = async ({ constituency, id }) => {
  try {
    const user = await model.user.findById(id);
    if (!user) {
      throw new Error("USer not found");
    }

    user.constituency = constituency;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};
const register = async ({
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
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateProfilePicture,
  getProfile,
  get,
  updateConstituency,
  register,
};
