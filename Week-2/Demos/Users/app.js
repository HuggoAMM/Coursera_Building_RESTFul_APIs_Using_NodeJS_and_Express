const express = require("express");
const app = express();
const config = require("./config");
const usersRouter = require("./usersRouter");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const LoggerMiddleware = (request, response, next) => {
  console.log(`Logged ${request.url} ${request.method} ${new Date()}`);
  next();
};

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(LoggerMiddleware);
app.use(express.json());
app.use("/api/v1/users", usersRouter);
app.use((request, response, next) => {
  response.status(404).send("Error Not Found");
});

app.listen(config.PORT, () => {
  console.log("Listening on port 3000");
});
