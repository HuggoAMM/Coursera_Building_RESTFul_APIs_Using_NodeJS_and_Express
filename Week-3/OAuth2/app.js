const express = require("express");
const path = require("path");
const dateFormat = require("date-format");
const app = express();
const morgan = require("morgan");
const config = require("./config");
const oauthRouter = require("./oauth/auth.router");

morgan.token("time", () =>
  dateFormat.asString(dateFormat.ISO08601_FORMAT, new Date())
);
app.use(
  morgan(
    "[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"
  )
);

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.use("/oauth", oauthRouter);

app.listen(config.PORT, () => {
  console.log("Listening on port 3000");
});
