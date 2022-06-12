const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");

const Users = require("../../models/users");
const createResponse = require("../../utils/resStruct");
const validateRequest = require("../../middlewares/validateRequest");
const Products = require("../../models/adminCard/Products");

routes.get("/products", [validateRequest], async (req, res, next) => {
  const Allproducts = await Products.find();
  res
    .status(200)
    .send(createResponse("SUCCESS", "All about the Products", { Allproducts }));
});

module.exports = routes;
