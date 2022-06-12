const express = require("express");
const routes = express.Router();
const multer = require("multer");

const Products = require("../../models/adminCard/Products");
const validateRequest = require("../../middlewares/adminRequestValidate");

routes.post("/uploadFile", async (req, res, next) => {
  console.log(req.file);
});

module.exports = routes;
