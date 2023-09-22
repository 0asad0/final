const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.post("/cast", controller.vote.cast);

module.exports = router;
