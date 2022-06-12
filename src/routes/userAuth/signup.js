const express = require("express");
const routes = express.Router();
const { body, check, validationResult } = require("express-validator");
const Users = require("../../models/users");
const createResponse = require("../../utils/resStruct");
const UserRegisterValidation = require("../../middlewares/userRegisterValidation");

routes.post("/signup", UserRegisterValidation(), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(createResponse("ERROR", "Validation Failed", errors.errors));
  } else {
    const { name, email, password } = req.body;
    const checkExistence = await Users.findOne({ email: email });
    if (!checkExistence) {
      const user_save = new Users({
        name: name,
        email: email,
        password: password,
      });
      user_save
        .save()
        .then((result) => {
          res
            .status(200)
            .send(createResponse("SUCCESS", "User created Successfully", {}));
        })
        .catch((err) => {
          res.status(400).send(createResponse("ERROR", "Error signup", {}));
        });
    } else {
      res
        .status(400)
        .send(createResponse("ERROR", "This email is already exist", {}));
    }
  }
});

module.exports = routes;
