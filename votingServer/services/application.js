const model = require("../models");

const applyCandidate = async ({ userId, constituency }) => {
  try {
    const existingCandidate = await model.user.findOne({
      user: userId,
      userType: "Candidate",
    });
    if (existingCandidate) {
      return res.status(400).json({ message: "User is already a Candidate" });
    }
    const apply = await new model.candidateApplication({
      user: userId,
      constituency,
    });

    await apply.save();

    return apply;
  } catch (error) {
    throw error;
  }
};

const get = async () => {
  try {
    const applications = await model.candidateApplication
      .find({
        approvalStatus: "Pending",
      })
      .populate({
        path: "user",
        match: { userType: "Voter" },
      })
      .populate("constituency");

    if (!applications || applications.length === 0) {
      return { success: false, message: "No Pending Voter Applications Found" };
    }

    const pendingVoterApplications = applications.filter((application) => {
      return application.user !== null && application.user.userType === "Voter";
    });

    return { success: true, applications: pendingVoterApplications };
  } catch (error) {
    throw error;
  }
};

const changeStatus = async ({ userId, id, status }) => {
  try {
    const user = await model.user.findOne({ _id: userId });
    if (!user) {
      return { success: false, message: "User Not Found" };
    }
    user.userType = "Candidate";
    await user.save();

    const application = await model.candidateApplication.findOne({ _id: id });

    if (!application) {
      return { success: false, message: "No Application Found" };
    }
    application.approvalStatus = status;

    await application.save();

    return {
      success: true,
      message: "Application Status Updated Successfully",
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  applyCandidate,
  get,
  changeStatus,
};
