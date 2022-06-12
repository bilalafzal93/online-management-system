const express = require("express");
const routes = express.Router();

const createResponse = require("../../utils/resStruct");
const createAdmin = require("../../models/admin");
const Admin = require("../../models/admin");

routes.post("/createAdmin", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;
  const admin = new Admin({ password: pass, name: name, email: email });
  admin
    .save()
    .then((result) => {
      res
        .status(200)
        .send(createResponse("SUCCESS", "Admin created Successfully", {}));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = routes;
