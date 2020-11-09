const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const morgan = require("morgan");
const app = express();





//Products and Orders start
const productRoutes = require("./routes/api/products");
const orderRoutes = require("./routes/api/Orders");
//others object api
const customerRoutes = require("./routes/api/customers");
const employerRoutes= require("./routes/api/employers");
const chargeRoutes= require("./routes/api/charges");
const incidentRoutes= require("./routes/api/incidents");







// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
//ajouter pour products and orders
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
/// orders and products code end



const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/customers", customerRoutes);
app.use("/employers", employerRoutes);
app.use("/charges", chargeRoutes);
app.use("/incidents", incidentRoutes);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Let's go on port ${port} !`));