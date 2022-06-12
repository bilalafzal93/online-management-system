const express = require("express");
const routes = express.Router();

const createResponse = require("../../utils/resStruct");
const validateRequest = require("../../middlewares/adminRequestValidate");
const Products = require("../../models/adminCard/Products");

routes.post("/createItem", [validateRequest], (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const Product = new Products({
    title: title,
    price: price,
    description: description,
  });
  //   res.send("hello from the world");
  Product.save()
    .then((result) => {
      res
        .status(200)
        .send(createResponse("SUCCESS", "Product Created Successfully"));
    })
    .catch((err) => {
      res
        .status(400)
        .send(createResponse("ERROR", "Error while creating the product", {}));
      console.log(err);
    });
});

module.exports = routes;
