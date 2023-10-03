var express = require("express");
var app = express();

const users = [
  { username: "Hugo", userId: 1 },
  { username: "Andres", userId: 2 },
];

app.get("/users/:userId", (request, response) => {
  const userData = users.find(
    (u) => u.userId === parseInt(request.params.userId)
  );
  if (userData) {
    response.status(200).send(userData);
  } else {
    response.status(404).send("No existe el userId:", request.params.userId);
  }
});

app.listen(3000, () => {
  console.log("Listnening on Port 3000");
});
