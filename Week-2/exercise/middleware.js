const express = require("express");
const config = require("./config");
const app = express();
const usersRouter = require("./users");

const LoggerMiddleware = (request, response, next) => {
  console.log(`Logged ${request.url} ${request.method} ${new Date()}`);
  next();
};

app.use(LoggerMiddleware);
app.use.express.urlencoded({ extended: false });
app.use("/api/v1/users", usersRouter);
app.use((request, response, next) => {
  response.status(404).send("Error Not Found");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// app.get("/", (request, response, next) => {
//   next();
// });
