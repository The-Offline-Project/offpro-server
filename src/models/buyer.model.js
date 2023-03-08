const { Schema, model } = require("mongoose");

const buyerModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["commercial", "consumer"],
    default: "commercial",
  },
  businessName: {
    type: String,
    default: null,
  },
  businessType: {
    type: String,
    default: null,
  },
  companySize: {
    type: String,
    default: null,
  },
  revenueSize: {
    type: String,
    default: null,
  },
});

const Buyer = model("Buyer", buyerModel);
module.exports = Buyer;
