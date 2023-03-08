const { Schema, model } = require("mongoose");

const specialEventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Special event must have a name"],
    },
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: [true, "Special event must include a farmer"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    promoCode: {
      type: Schema.Types.ObjectId,
      ref: "PromoCode",
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Mongoose hooks here - if any

const SpecialEvent = model("SpecialEvent", specialEventSchema);

module.exports = SpecialEvent;
