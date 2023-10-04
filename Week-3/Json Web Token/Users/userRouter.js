const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.get("/", (req, res) => {
  try {
    const userData = req.claims;
    console.log(userData);
    if (!userData.email) {
      return res.status(400).send("user email not available");
    }

    userController.findUser(userData.email, (err, result) => {
      if (err) {
        res.status(400).send("error getting the user", err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "unexpected error try after sometime", error });
  }
});

module.exports = router;
