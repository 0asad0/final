const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/signup", controller.auth.signup);
router.post("/login", controller.auth.login);

module.exports = router;
