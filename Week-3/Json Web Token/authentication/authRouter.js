const express = require("express");
const router = express.Router();
const authController = require("./authController");

router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("Required inpots are missing");
    }

    const userDetails = {
      name,
      email,
      password,
    };

    authController.registerUser(userDetails, (err, result) => {
      if (err) {
        return res.status(400).send({ error: "User alredy exists" });
      } else {
        return res.status(201).send(result);
      }
    });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Unexpected error while registering the user" });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Required inpots are missing");
    }

    authController.loginUser({ email, password }, (err, result) => {
      if (err) {
        return res.status(400).send({ error: "Invalid credentials", err });
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Unexpected error while registering the user", error });
  }
});

module.exports = router;
