const express = require("express");
const app = express();
const { append } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const createResponse = require(".././utils/resStruct");

const validateRequest = (req, res, next) => {
  const session = req.session.token;
  if (session != undefined) {
    jwt.verify(
      req.session.token.token,
      process.env.SECRET_KEY,
      (err, authData) => {
        if (err) {
          return res
            .status(400)
            .send(createResponse("ERROR", "UnAutherized User", {}));
        } else {
          next();
        }
      }
    );
  } else {
    return res
      .status(400)
      .send(createResponse("ERROR", "UnAutherized User", {}));
  }
};

module.exports = validateRequest;
