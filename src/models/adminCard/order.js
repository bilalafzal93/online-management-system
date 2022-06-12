const mongoose = require("mongoose");
// const { schema } = require("../admin");
const Schema = mongoose.Schema;

const createItem = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        per_item: {
          type: Number,
          required: true,
        },
        total_amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", createItem);
