const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userconnect = require("./Route/userconnect");
const transaction = require("./Route/transaction");
const admin = require("./Route/admin");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const corsoption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};
//set port
app.set("port", process.env.PORT);
// set cors
app.use(cors(corsoption));
app.use(cookieparser());
//bodyparser
app.use(bodyparser.json());
// Route
app.use(userconnect);
app.use(transaction);
app.use(admin);
mongoose
  .connect(process.env.URL)
  .then((res) => {
    console.log("ok");
    app.listen(app.get("port"));
  })
  .catch((err) => {
    console.log(err);
  });
