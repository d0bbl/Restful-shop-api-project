const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/database");
const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const users = require("./api/routes/users");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect(db.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
//LISTENING FOR REQUESTS
.then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("listening for requests"));
})
.catch(err => console.log(err));

app.use("/api", products);
app.use("/api", orders);
app.use("/user", users);

// app.use((req, res, next) => {
//   res.locals.product = req.product || null;
//   next();
// });


app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status( error.status || 500 ).json({
    message: error.message
  })
})
