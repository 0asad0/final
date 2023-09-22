const auth = require("./auth");
const candidate = require("./candidate");
const constituency = require("./constituency");
const elections = require("./elections");
const user = require("./user");
const vote = require("./vote");
const application = require("./application");

module.exports = {
  auth,
  elections,
  constituency,
  user,
  vote,
  candidate,
  application,
};
