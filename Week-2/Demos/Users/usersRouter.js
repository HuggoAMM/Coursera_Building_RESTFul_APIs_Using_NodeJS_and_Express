const express = require("express");
const routes = express.Router();

const userController = require("./usersController");

routes.get("/", (request, response) => {
  try {
    userController.getUsers((error, results) => {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).send({ status: "OK", data: results });
    });
  } catch (error) {
    return response.status(500).send("Try after sometime");
  }
});

routes.get("/:userId", (request, response) => {
  try {
    const userId = request.params.userId;
    userController.getUserById(userId, (error, results) => {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).send({ status: "OK", data: results });
    });
  } catch (error) {
    return response.status(500).send("Try after sometime");
  }
});

routes.put("/:userId", (request, response) => {
  try {
    const userId = request.params.userId;
    const userName = request.body.userName;
    userController.updateUser(userId, userName, (error, results) => {
      if (error) {
        return response.status(400).send(error);
      }
      return response.status(200).send({ status: "OK", data: results });
    });
  } catch (error) {
    return response.status(500).send("Try after sometime");
  }
});

module.exports = routes;
