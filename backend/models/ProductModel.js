const mongoose = require("mongoose");
require("datejs");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required!"],
  },
  description: {
    type: String,
    required: [true, "Product Description is required!"],
  },
  price: {
    type: String,
    required: [true, "Product Price is required!"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.today().toString("yyyy-MM-dd"),
  },
});

module.exports = mongoose.model("Product", productSchema);
