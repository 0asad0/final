const auth = require("./auth");
const elections = require("./elections");
const constituency = require("./constituency");
const candidate = require("./candidate");
const user = require("./user");
const vote = require("./vote");
const application = require("./application");

module.exports = {
  elections,
  auth,
  constituency,
  candidate,
  user,
  vote,
  application,
};
