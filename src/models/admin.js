const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const { encrypt } = require("../utils/encryption");
const adminSchema = new Schema({
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

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(this.password);
    this.password = await encrypt(this.password);
    console.log(this.password);
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
