const { Schema, model } = require("mongoose");

const productModel = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: [true, "Product must belong to a farmer"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product must belong to a category"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    default: null,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price cannot be less than 0"],
  },
  photos: [
    {
      name: { type: String },
      size: { type: String },
      mimetype: { type: String },
    },
  ],
});

const Product = model("Product", productModel);

module.exports = Product;
