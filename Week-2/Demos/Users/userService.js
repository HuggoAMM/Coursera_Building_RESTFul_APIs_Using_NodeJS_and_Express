const userDAO = require("./usersDAO");

const getUsers = (done) => {
  userDAO.getUsers(done);
};

const getUserById = (userId, done) => {
  userDAO.getUserById(userId, done);
};

const updateUser = (userId, userName, done) => {
  userDAO.updateUser(userId, userName, done);
};

module.exports = { getUsers, getUserById, updateUser };
