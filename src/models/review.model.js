const { Schema, model } = require("mongoose");

const reviewModel = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: [true, "A review must belong to a farmer"],
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: [true, "A review must be made by a buyer"],
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "A review must belong to an order"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "A rating is required for every review"],
  },
  comment: {
    type: String,
  },
});

const Review = model("Review", reviewModel);
module.exports = Review;
