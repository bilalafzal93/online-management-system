const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createResponse = require("../../utils/resStruct");

const routes = express.Router();
const Users = require("../../models/users");
const { is } = require("express/lib/request");
const Admin = require("../../models/admin");
const { decrypt } = require("../../utils/encryption");

routes.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const admin = await Admin.findOne({ email: email });
  const user = await Users.findOne({ email: email });
  if (!admin && !user) {
    res.status(200).send(createResponse("ERROR", "Account not Found", {}));
  } else if (admin) {
    if (decrypt(admin.password) == password) {
      //set token
      const token = jwt.sign(
        {
          data: Admin.id,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRESIN }
      );
      req.session.token = { token: token, key: "Admin" };
      res
        .status(200)
        .send(createResponse("SUCCESS", "Admin login Successfully", {}));
    } else {
      res.status(200).send(createResponse("ERROR", "Account not Found", {}));
    }
  } else if (user && !admin) {
    if (decrypt(user.password) == password) {
      //set token
      const token = jwt.sign(
        {
          data: user.id,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRESIN }
      );
      req.session.token = { token: token, key: "", userID: user.id };
      res
        .status(200)
        .send(createResponse("SUCCESS", "User login Successfully", {}));
    } else {
      res.status(400).send(createResponse("ERROR", "Invalid Password", {}));
    }
  }
});

module.exports = routes;
