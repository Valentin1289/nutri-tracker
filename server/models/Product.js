const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const productSchema = new Schema({
  barcode: Number,
  name: String,
  nutriments: { type: Object, default: {} },
});

const Product = model("Product", productSchema);
module.exports = Product;
