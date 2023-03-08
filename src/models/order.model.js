const { Schema, model } = require("mongoose");

const orderModel = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  farmer_id: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  datePurchased: {
    type: Date,
    default: new Date(),
  },
  region: {
    type: String,
    required: true,
  },
});

const Order = model("Order", orderModel);
module.exports = Order;
