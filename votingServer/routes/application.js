const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", controller.application.get);
router.post("/", controller.application.apply);
router.put("/", controller.application.changeStatus);

module.exports = router;
