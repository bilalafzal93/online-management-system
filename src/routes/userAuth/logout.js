const express = require("express");
const routes = express.Router();
const createResponse = require("../../utils/resStruct");

routes.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    if (!err) {
      res
        .status(200)
        .send(createResponse("SUCCESS", "You Have Currenty Loggedout", {}));
    }
  });
});

module.exports = routes;
