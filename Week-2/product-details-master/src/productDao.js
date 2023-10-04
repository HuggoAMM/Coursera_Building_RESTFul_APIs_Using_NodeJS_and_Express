const fs = require("fs");

const getProducts = function (done) {
  fs.readFile("./src/products.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener los usuarios");
    }
    let userData = JSON.parse(fileContent);
    return done(undefined, userData);
  });
};
const getProductById = function (id, done) {
  fs.readFile("./src/products.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener el usuario");
    }
    const userData = JSON.parse(fileContent);
    const user = userData.find((usr) => usr.id === parseInt(id));
    if (user === undefined) {
      return done("No existe el usuario con el id: ", id);
    }
    return done(undefined, user);
  });
};

const saveProductDetails = function (ProductDetails, done) {
  fs.readFile("./src/products.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener los productos");
    }
    const productData = JSON.parse(fileContent);
    productData.push(ProductDetails);

    fs.writeFile(
      "./src/products.json",
      JSON.stringify(productData),
      (error, updateContent) => {
        if (error) {
          return done("No se pudo agregar el producto");
        }
        return done(undefined, ProductDetails);
      }
    );
  });
};

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file

const deleteProductById = function (productId, done) {
  fs.readFile("./src/products.json", (error, fileContent) => {
    if (error) {
      return done("Error al obtener el usuario");
    }
    const productData = JSON.parse(fileContent);

    console.log(productData);
    const productIndex = productData.findIndex(
      (usr) => usr.id === parseInt(productId)
    );
    if (productIndex === -1) {
      return done("No existe el producto con el id: ", productId);
    }

    productData.splice(productIndex, 1);
    fs.writeFile(
      "./src/products.json",
      JSON.stringify(productData),
      (error, updateContent) => {
        if (error) {
          return done("No se elimino el producto con el id: ", productId);
        }
        return done(undefined, "Se elimino el producto correctamente");
      }
    );
  });
};

module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById,
};
