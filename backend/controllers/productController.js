// backend/controllers/productController.js
const products = require('../data/products.json');

exports.getAllProducts = (req, res) => {
  return res.json(products);
};
