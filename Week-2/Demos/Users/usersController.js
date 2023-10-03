const userService = require("./userService");

const getUsers = (done) => {
  userService.getUsers(done);
};

const getUserById = (userId, done) => {
  userService.getUserById(userId, done);
};

const updateUser = (userId, userName, done) => {
  userService.updateUser(userId, userName, done);
};

module.exports = { getUsers, getUserById, updateUser };
