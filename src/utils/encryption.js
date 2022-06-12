const aes256 = require("aes256");
const { modelNames } = require("mongoose");

const encrypt = (value) => {
  return aes256.encrypt(process.env.AES256_KEY, value);
};

const decrypt = (value) => {
  return aes256.decrypt(process.env.AES256_KEY, value);
};

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
