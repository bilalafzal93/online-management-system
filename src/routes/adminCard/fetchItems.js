const express = require("express");
const routes = express.Router();

const Products = require("../../models/adminCard/Products");
const validateRequest = require("../../middlewares/adminRequestValidate");

routes.get("/fetchItems", [validateRequest], async (req, res, next) => {

  const Allproducts = await Products.find();
  res.send(Allproducts);
});

module.exports = routes;
