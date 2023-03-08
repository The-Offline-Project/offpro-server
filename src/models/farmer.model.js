const { Schema, model } = require("mongoose");

const farmerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  land: {
    size: { type: String, default: null },
    isPloughed: { type: Boolean, default: false },
    ownership: { type: String, default: null },
  },
  funding: {
    source: { type: String, default: null },
    hasCropInsurance: { type: Boolean, default: false },
    bank: { type: String, default: null },
  },
  certifications: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
  businessName: {
    type: String,
    default: null,
  },
  registrationNumber: {
    type: String,
    default: null,
  },
  hasPackHouse: {
    type: Boolean,
    default: false,
  },
  isLookingForFunding: {
    type: Boolean,
    default: false,
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
  farmType: {
    type: String,
    enum: ["fruits", "vegetables", "legumes"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Farmer = model("Farmer", farmerSchema);

module.exports = Farmer;
