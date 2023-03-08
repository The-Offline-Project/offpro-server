const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    code: {
      type: String,
      maxlength: 10,
      unique: true,
      index: true,
      required: [true, "Coupon must have a code"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Coupon must belong to a product"],
    },
    numberOfCouponsAvailable: {
      type: Number,
      required: [true, "Specify the number of coupons available"],
    },
    couponPrice: {
      type: Number,
      required: [true, "Coupon must have a coupon price"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      // default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
  },
  { timestamps: true },
);

// Mongoose hooks here - if any

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
