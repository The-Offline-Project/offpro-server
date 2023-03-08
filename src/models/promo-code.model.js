const { Schema, model } = require("mongoose");

const promoCodeSchema = new Schema(
  {
    code: {
      type: String,
      maxlength: 10,
      unique: true,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Mongoose hooks here - if any

const PromoCode = model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
