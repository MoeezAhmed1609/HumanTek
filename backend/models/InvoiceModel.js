const mongoose = require("mongoose");
require("datejs");
const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.today().toString("yyyy-MM-dd"),
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
