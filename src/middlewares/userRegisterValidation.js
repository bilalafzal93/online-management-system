const express = require("express");
const routes = express.Router();
const { body, check, validationResult } = require("express-validator");
const { createResponse } = require("../utils/resStruct");

const UserRegisterValidation = () => {
  return [
    body("name")
      .isLength({ min: 4 })
      .withMessage("username must be at least 4 chars long")
      .isLength({ max: 12 })
      .withMessage(" username must be less than 12 chars long")
      .exists()
      .withMessage("username is required")
      .trim()
      .matches(/^[A-Za-z]+$/)
      .withMessage("username must be alphabetic")
      .escape(),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid Email")
      .exists(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 chars long")
      .isLength({ max: 30 })
      .withMessage("password must be at max 30 chars long")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("password must contain a number and letters")
      .exists(),
  ];
};

module.exports = UserRegisterValidation;
