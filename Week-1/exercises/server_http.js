const http = require("http");
const PORT = process.env.PORT || 4000;
const todos = require("./todos");
const getRequestData = require("./utils");

const server = http.createServer(async (request, response) => {
  if (request.url === "/api/v1/todos" && request.method === "GET") {
    response.writeHead(200, {
      "content-type": "application/json",
    });

    response.end(JSON.stringify(todos));
  }

  if (
    request.url.match(/\/api\/v1\/todos\/([0-9])/) &&
    request.method === "GET"
  ) {
    const id = request.url.split("/")[4];
    const todo = todos.find((item) => item.id === parseInt(id));

    response.writeHead(200, {
      "content-type": "application/json",
    });

    response.end(JSON.stringify(todo));
  }

  if (request.url === "/api/v1/todos" && request.method === "POST") {
    let todo_data = await getRequestData(request);

    todos.push(JSON.parse(todo_data));

    response.writeHead(200, {
      "content-type": "application/json",
    });

    response.end(JSON.stringify(todo_data));
  }

  if (
    request.url.match(/\/api\/v1\/todos\/([0-9])/) &&
    request.method === "PUT"
  ) {
    const id = request.url.split("/")[4];
    const todo = todos.find((item) => item.id === parseInt(id));

    if (!todo) {
      response.writeHead(404, {
        "content-type": "application/json",
      });
      response.end("No existe el item con el id:", id);
    } else {
      let todo_data = await getRequestData(request);
      todos.push(JSON.parse(todo_data));
      response.writeHead(200, {
        "content-type": "application/json",
      });

      response.end(JSON.stringify(todo_data));
    }
  }

  if (
    request.url.match(/\/api\/v1\/todos\/([0-9])/) &&
    request.method === "DELETE"
  ) {
    const id = request.url.split("/")[4];
    const todo = todos.find((t) => t.id === parseInt(id));

    if (!todo) {
      response.writeHead(404, {
        "content-type": "application/json",
      });
      response.end("No existe el item con el id:", id);
    } else {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      response.writeHead(200, {
        "content-type": "application/json",
      });

      response.end("Eliminado el item con el id:", id);
    }
  }
});

server.listen(PORT, () => {
  console.log("Server is ready and listenin at port", PORT);
});

server.on("Error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }

  console.log("Error:", error);
});
