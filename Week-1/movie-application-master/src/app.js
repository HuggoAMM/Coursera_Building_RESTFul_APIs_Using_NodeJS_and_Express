// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer((req, res) => {
  if (req.url === "/api/movies" && req.method === "GET") {
    moviesService.getMovies((err, result) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(err);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(result);
    });
  }
  // // Get a movie with specified id
  // // Save movie details
  // // Update a specific movie
  // else if (
  //   req.url.match(/\/api\/movies\/([0-9]+)/) &&
  //   req.method === "DELETE"
  // ) {
  //   const id = req.url.split("/")[3];
  //   try {
  //     const result = await moviesService.deleteMovieById(id);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     res.status(404).json(error);
  //   }
  // }
  // If no route present capture in the else part
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
