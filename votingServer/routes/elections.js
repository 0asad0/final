const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/active", controller.elections.getActive);
router.get("/:id", controller.elections.getDetails);
router
  .route("/")
  .post(controller.elections.start)
  .get(controller.elections.get);

module.exports = router;
