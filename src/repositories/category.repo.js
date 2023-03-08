const Category = require("../models/category.model");

class CategoryRepo {
  static async getSingleCategory({ category_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const category = await Category.findOne({ _id: category_id });

      if (!category) {
        return { ...response, msg: "Category not found", status: 404 };
      }

      return { ...response, msg: "Category retrieved successfully", status: 200, data: category };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async listAllCategories() {
    try {
      let response = { msg: "", status: null, data: null };

      const categories = await Category.find();

      if (categories.length === 0) {
        return { ...response, msg: "There are no categories", status: 200, data: categories };
      }

      return { ...response, msg: "Categories retrieved successfully", status: 200, data: categories };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createCategory({ name }) {
    try {
      let response = { msg: "", status: null, data: null };

      const category = await Category.create({ name });

      if (!category) {
        return { ...response, msg: "Could not create a category", status: 400 };
      }

      return { ...response, msg: "Category created", status: 201, data: category };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editCategory({ category_id, name }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCategory = await Category.findOne({ _id: category_id });

      if (!existingCategory) {
        return { ...response, msg: "Category does not exist", status: 404 };
      }

      const updatedCategory = await Category.findOneAndUpdate({ _id: category_id }, { name }, { new: true });

      if (!updatedCategory) {
        return { ...response, msg: "Could not update category", status: 400 };
      }

      return { ...response, msg: "Category updated", status: 200, data: updatedCategory };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async removeCategory({ category_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCategory = await Category.findOne({ _id: category_id });

      if (!existingCategory) {
        return { ...response, msg: "Category does not exist", status: 404 };
      }

      const deletedCategory = await Category.findOneAndDelete({
        _id: { $eq: product_id },
      });

      if (!deletedCategory) {
        return { ...response, msg: "Could not delete category", status: 400 };
      }

      return { ...response, msg: "Category deleted", status: 200, data: deletedCategory };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = CategoryRepo;
