const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");

const createResponse = require("../../utils/resStruct");
const validateRequest = require("../../middlewares/validateRequest");
const Order = require("../../models/adminCard/order");
const Products = require("../../models/adminCard/Products");
const order = require("../../models/adminCard/order");

routes.post("/order", [validateRequest], async (req, res, next) => {
  const userID = req.session.token.userID;
  var { productID, quantity } = req.body;
  //check product id and userid same return the object
  const user = await order.findOne({
    userID: userID,
    "cart.items.productId": productID,
  });
  //check only existing user with new product
  const user_id = await order.findOne({ userID: userID });
  if (!user_id) {
    const { price } = await Products.findOne({ _id: productID });
    const per_item_price = price;
    const totalprice = quantity * price;
    const orderitem = new Order({
      userID: userID,
      cart: {
        items: [
          {
            productId: productID,
            quantity: quantity,
            per_item: per_item_price,
            total_amount: totalprice,
          },
        ],
      },
      total: totalprice,
    });

    orderitem
      .save()
      .then((result) => {
        // const r = await Order.findById(result._id)
        //   .populate("userID")
        //   .populate("cart.items.productId")
        //   .exec();
        res
          .status(200)
          .send(createResponse("SUCCESS", "ORDER SAVE SUCCESSFULLY", {}));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (user_id && !user) {
    const { price } = await Products.findOne({ _id: productID });
    const per_item_price = price;
    const totalprice = quantity * price;
    const db_total = user_id.total;
    user_id.cart.items.push({
      productId: productID,
      quantity: quantity,
      per_item: per_item_price,
      total_amount: totalprice,
    });
    user_id.total = db_total + totalprice;
    new Order(user_id)
      .save()
      .then((result) => {
        res
          .status(200)
          .send(createResponse("SUCCESS", "ORDER SAVE SUCCESSFULLY", {}));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (user) {
    const index = user.cart.items.findIndex(
      (item) => item.productId == productID
    );
    let dquantity = user.cart.items[index].quantity;
    dquantity += +quantity;
    let price = user.cart.items[index].per_item;
    let cr_total_price = quantity * price;
    price = price * dquantity;
    const db_total = user.total;
    user.cart.items[index].quantity = dquantity;
    user.cart.items[index].total_amount = price;
    user.total = db_total + cr_total_price;
    new Order(user)
      .save()
      .then((result) => {
        res.status(200).send(createResponse("SUCCESS", "ORDER SAVE", {}));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = routes;
