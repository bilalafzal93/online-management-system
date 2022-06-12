const express = require("express");
const routes = require("./createItem");

const createResponse = require("../../utils/resStruct");
const validateRequest = require("../../middlewares/adminRequestValidate");
const Products = require("../../models/adminCard/Products");

routes.get("/deleteItem", [validateRequest], async (req, res, next) => {
  //   const item = await Products.deleteOne({ _id });
  (async function (_id) {
    try {
      const result = await Products.deleteOne({ _id });
      console.log(result.deletedCount);
      if (result.deletedCount != 0)
        res
          .status(200)
          .send(createResponse("SUCCESS", "Item Successfully Delete", {}));
      else
        res
          .status(200)
          .send(createResponse("ERROR", "Product already Not available", {}));
    } catch (err) {
      res.status(400).send(createResponse("ERROR", "DB ERROR", { err }));
    }
  })(req.body.id);
});

module.exports = routes;
