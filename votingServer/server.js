const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const config = require("./config");
const routes = require("./routes");
const error = require("./middleware/error");
const AppError = require("./utils/AppError");
const authenticateToken = require("./middleware/auth");

config.mongoose.connection();

app.use(express.json());
app.use("/api/auth", routes.auth);
app.use(authenticateToken);
app.use("/api/constituency", routes.constituency);
app.use("/api/candidate", routes.candidate);
app.use("/api/elections", routes.election);
app.use("/api/vote", routes.vote);
app.use("/api/user", routes.user);
app.use("/api/application", routes.application);

app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find url: '${req.originalUrl}' on this server`, 404),
  );
});

app.use(error);

function start() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { start };
