// Import the necessary dependencies
const productsList = require("./products.json").products;

const getProducts = () => {
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  let product = productsList.find((p) => p.id === parseInt(productId));

  if (!product) {
    return done("Requested product doesn't exist..!");
  } else {
    return done(null, JSON.stringify(product));
  }
};

const saveProduct = (newProduct, done) => {
  let product = productsList.find((p) => p.id === parseInt(newProduct.id));

  if (!product) {
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  } else {
    return done("Product already exists..!");
  }
};

const updateProduct = (productId, updateData, done) => {
  let product = productsList.find((p) => p.id === parseInt(productId));

  if (!product) {
    return done("Requested product doesn't exist..!");
  } else {
    Object.assign(product, updateData);
    return done(null, JSON.stringify(productsList));
  }
};

const deleteProduct = (productId, done) => {
  const productIndex = productsList.findIndex(
    (p) => p.id === parseInt(productId)
  );
  if (productIndex === -1) {
    return done("Requested product doesn't exist..!");
  } else {
    productsList.splice(productIndex, 1);
    return done(null, JSON.stringify(productsList));
  }
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
