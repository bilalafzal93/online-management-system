const mongoose = require("mongoose");
const { title } = require("process");
const { stringify } = require("querystring");
const { Interface } = require("readline");
const Schema = mongoose.Schema;

// interface ItemAttrs {
//   title: String;
//   price: Number;
//   description: String;
// }

// interface ItemDoc extends mongoose.Document {
//   title: String;
//   price: Number;
//   description: String;
// }

// interface ItemModel extends mongoose.Model<ItemDoc> {
//   build(attrs: ItemAttrs): ItemDoc;
// }

const createItem = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// createItem.static.build = (attrs: ItemAttrs) => {
//   return new Products(attrs);
// };

// const Products = mongoose.model<ItemAttrs , ItemModel>("Products",createItem);
module.exports = mongoose.model("Products", createItem);
