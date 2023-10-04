const express = require("express");
const config = require("../config");
const router = express.Router();
const oauthController = require("./auth.controller");

router.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`
  );
});

router.get("/callback", (req, res) => {
  try {
    oauthController.oauthProcessor(req.query.code, (err, data) => {
      if (err) {
        console.log("errorRouter =>", err);
        res.status(401).send({ err: "Bad request" });
      }
      res.redirect(`/welcome.html?token=${data}`);
      console.log("dataRouter =>", data);
    });
  } catch (error) {
    console.log("errorRouter =>", error);
  }
});

module.exports = router;
