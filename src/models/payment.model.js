const { Schema, model } = require("mongoose");

const paymentModel = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: [true, "Payment must belong to a buyer"],
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Payment must belong to an order"],
  },
  farmer: { type: Schema.Types.ObjectId, ref: "Farmer", required: [true, "Payment must belong to a farmer"] },
  transactionId: {
    type: String,
    default: null,
    // required?
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Payment = model("Payment", paymentModel);

module.exports = Payment;
