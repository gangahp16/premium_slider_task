const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/premium_db")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

module.exports = mongoose;