const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categoryModel);

module.exports = Category;
