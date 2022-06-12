require("dotenv").config({ path: "../.env" });

//built in modulels
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

//user defined module
const createadmin = require("./routes/adminAuth/createAdmin");
const signup = require("./routes/userAuth/signup");
const login = require("./routes/login/login");
const logout = require("./routes/userAuth/logout");
const products = require("./routes/shop/products");
const order = require("./routes/shop/order");
const createItem = require("./routes/adminCard/createItem");
const fetchItems = require("./routes/adminCard/fetchItems");
const deleteItem = require("./routes/adminCard/deleteItem");
const updateItem = require("./routes/adminCard/updateItem");
const uploadfile = require("./routes/adminCard/uploadDataFile");

// app
const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
// const filestorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "filestorage");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toString() + "-" + file.originalname);
//   },
// });

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(multer({ storage: filestorage }).single("file"));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//routes
app.use(signup);
app.use(login);
app.use(products);
app.use(logout);
app.use(createadmin);
app.use(createItem);
app.use(fetchItems);
app.use(deleteItem);
app.use(updateItem);
app.use(uploadfile);
app.use(order);
(async function () {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    if (response) {
      console.log("db_conneted");
      app.listen(3000, (req, res) => {
        console.log("app listening at port no 3000");
      });
    } else {
      console.log("connection Failed");
    }
  } catch (err) {
    console.log(err);
  }
})();
