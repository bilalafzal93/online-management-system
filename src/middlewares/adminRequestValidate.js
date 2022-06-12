const express = require("express");
const app = express();
const { append } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const createResponse = require(".././utils/resStruct");

const validateRequest = (req, res, next) => {
  if (req.session.token != undefined) {
    if (req.session.token.key != "") {
      const tokenAdmin = req.session.token.key;
      if (tokenAdmin != null) {
        jwt.verify(
          req.session.token.token,
          process.env.SECRET_KEY,
          (err, authData) => {
            if (err) {
              res
                .status(400)
                .send(createResponse("ERROR", "UnAutherized User", {}));
            } else {
              next();
            }
          }
        );
      } else {
        res.status(400).send(createResponse("ERROR", "UnAutherized User", {}));
      }
    } else {
      res.status(400).send(createResponse("ERROR", "UnAutherized User", {}));
    }
  } else {
    res.status(400).send(createResponse("ERROR", "UnAutherized User", {}));
  }
};

module.exports = validateRequest;
