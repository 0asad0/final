const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.route("/").get(controller.user.get).post(controller.user.registerUser);

router.put("/:id/constituency", controller.user.updateConstituency);

router.route("/profile").get(controller.user.getProfile);
router.get("/profile/:id", controller.user.getProfile);

router.put("/profile/:cloudinaryUrl", controller.user.updateProfilePicture);

module.exports = router;
