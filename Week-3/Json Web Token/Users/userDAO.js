const users = require("./users.json");
const fs = require("fs");

const findUser = (email, done) => {
  const userFetch = users.filter((user) => user.email === email)[0];
  done(undefined, userFetch);
};

const registerUser = (userData, done) => {
  users.push(userData);
  fs.writeFileSync("./Users/users.json", JSON.stringify(users));
  done(undefined, userData);
};

module.exports = { findUser, registerUser };
