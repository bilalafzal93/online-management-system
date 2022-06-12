const express = require("express");
const routes = express.Router();

const Products = require("../../models/adminCard/Products");
const validateRequest = require("../../middlewares/adminRequestValidate");
const createResponse = require("../../utils/resStruct");

routes.get("/updateItem", [validateRequest], async (req, res, next) => {
  const _id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  (async function (_id, title, price, description) {
    try {
      const result = await Products.updateOne(
        { _id },
        { $set: { title: title, price: price, description: description } }
      );
      res
        .status(200)
        .send(createResponse("SUCCESS", "Item Updated Successfully"));
    } catch (err) {
      res
        .status(400)
        .send(createResponse("ERROR", "ERROR while Updating", { err }));
    }
  })(_id, title, price, description);
});

module.exports = routes;
