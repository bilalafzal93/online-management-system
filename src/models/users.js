const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const { encrypt } = require("../utils/encryption");
// const { encrypt } = require("aes256");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await encrypt(this.password);
    console.log(this.password);
  }
  next();
});

module.exports = mongoose.model("Users", userSchema);
