const fs = require("fs");

const getUsers = (done) => {
  fs.readFile("users.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener los usuarios");
    }
    let userData = JSON.parse(fileContent);
    return done(undefined, userData);
  });
};

const getUserById = (userId, done) => {
  fs.readFile("users.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener el usuario");
    }
    const userData = JSON.parse(fileContent);
    const user = userData.find((usr) => usr.userId === parseInt(userId));
    if (user === undefined) {
      return done("No existe el usuario con el id: ", userId);
    }
    return done(undefined, user);
  });
};

const updateUser = (userId, userName, done) => {
  fs.readFile("users.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener el usuario");
    }
    const userData = JSON.parse(fileContent);
    const userIndex = userData.findIndex(
      (usr) => usr.userId === parseInt(userId)
    );
    if (userIndex === -1) {
      return done("No existe el usuario con el id: ", userId);
    }

    userData[userIndex].userName = userName;
    fs.writeFile(
      "users.json",
      JSON.stringify(userData),
      (error, updateContent) => {
        if (error) {
          return done("No se pudo actualizar el usuario con el id: ", userId);
        }

        return done(undefined, "Se actualizo el usuario correctamente");
      }
    );
  });
};

module.exports = { getUsers, getUserById, updateUser };
