const productsService = require("./productsService");
const getRequestData = require("./utils");
const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // Get all products
  if (req.url === "/api/products" && req.method === "GET") {
    const products = await productsService.getProducts();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(products);
  }

  // Get a product with specified id
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    productsService.getProductsById(id, (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // Create a new product
  else if (req.url === "/api/products" && req.method === "POST") {
    let product_data = await getRequestData(req);
    productsService.saveProduct(JSON.parse(product_data), (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // Update a specific product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    let product_data = await getRequestData(req);
    productsService.updateProduct(
      id,
      JSON.parse(product_data),
      (error, result) => {
        if (error) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(error);
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(result);
        }
      }
    );
  }

  // Delete a specific Product
  else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    productsService.deleteProduct(id, (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
