const userDao = require("./userDAO");
const findUser = (email, done) => {
  userDao.findUser(email, done);
};

const registerUser = (userData, done) => {
  userDao.registerUser(userData, done);
};

module.exports = { findUser, registerUser };
