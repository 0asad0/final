const express = require("express");
const router = express.Router();
const controller = require("../controller");

router
  .route("/")
  .get(controller.constituency.get)
  .post(controller.constituency.add);

module.exports = router;
