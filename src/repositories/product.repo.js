const _ = require("lodash");
const fs = require("fs");
const Farmer = require("../models/farmer.model");
const Product = require("../models/product.model");

class ProductRepo {
  static async getAllProducts() {
    try {
      let response = { msg: "", status: null, data: null };

      const products = await Product.find();

      if (products.length === 0) {
        return { ...response, msg: "No products found", status: 200, data: products };
      }

      return { ...response, msg: "Products retrieved successfully", status: 200, data: products };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getFarmerInventory({ user_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const products = await Product.find({ owner: { $eq: user_id } });

      if (products.length === 0) {
        return { ...response, msg: "Farmer has no listed products", status: 200, data: products };
      }

      return { ...response, msg: "Farmer inventory retrieved successfully", status: 200, data: products };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editProduct({ product_id, isApproved, category, name, price, description }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingProduct = await Product.findOne({ _id: product_id });

      if (!existingProduct) {
        return { ...response, msg: "Product does not exist", status: 404 };
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product_id },
        { name, description, price, category, isApproved: isApproved ? true : false },
        { new: true },
      );

      if (updatedProduct) {
        return {
          ...response,
          msg: isApproved ? "Product verified successfully" : "Product updated successfully",
          status: 200,
          data: updatedProduct,
        };
      }

      return { ...response, msg: "Could not update product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editFarmerProduct({ user_id, product_id, category, name, price, description }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingProduct = await Product.findOne({ _id: product_id });

      if (!existingProduct) {
        return { ...response, msg: "Product does not exist", status: 404 };
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: { $eq: product_id }, $and: [{ owner: { $eq: user_id } }] },
        { name, description, price, category },
        { new: true },
      );

      if (updatedProduct) {
        return { ...response, msg: "Product updated successfully", status: 200, data: updatedProduct };
      }

      return { ...response, msg: "Could not update product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteFarmerProduct({ user_id, product_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingProduct = await Product.findOne({ _id: product_id });

      if (!existingProduct) {
        return { ...response, msg: "Product does not exist", status: 404 };
      }

      const productPhotos = [...existingProduct.photos];
      const deletedProduct = await Product.findOneAndDelete({
        _id: { $eq: product_id },
        $and: [{ owner: { $eq: user_id } }],
      });

      if (deletedProduct) {
        // Remove their images from the file system
        _.forEach(productPhotos, (photo) => {
          fs.unlink("./uploads/" + `${user_id}-${photo.name}`, (err) => {
            if (err) {
              console.log("Could not delete file");
            } else {
              console.log("File deleted successfully");
            }
          });
        });

        await Farmer.findOneAndUpdate({ user: user_id }, { $pull: { products: product_id } });
        return { ...response, msg: "Product deleted successfully", status: 200, data: deletedProduct };
      }

      return { ...response, msg: "Could not delete product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteProduct({ product_id, user_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingProduct = await Product.findOne({ _id: product_id });

      if (!existingProduct) {
        return { ...response, msg: "Product does not exist", status: 404 };
      }

      const productPhotos = [...existingProduct.photos];
      const deletedProduct = await Product.findOneAndDelete({
        _id: { $eq: product_id },
        $and: [{ owner: { $eq: user_id } }],
      });

      if (deletedProduct) {
        // remove their images from the file system
        _.forEach(productPhotos, (photo) => {
          fs.unlink("./uploads/" + `${user_id}-${photo.name}`, (err) => {
            if (err) {
              console.log("Could not delete file");
            } else {
              console.log("File deleted successfully");
            }
          });
        });

        await Farmer.findOneAndUpdate({ user: user_id }, { $pull: { products: product_id } });
        return { ...response, msg: "Product deleted successfully", status: 200, data: deletedProduct };
      }

      return { ...response, msg: "Could not delete product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createFarmerProduct({ user_id, photos, category, name, price, description }) {
    try {
      let response = { msg: "", status: null, data: null };
      let images = [];

      // handle file uploads
      if (!_.isArray(photos)) {
        // move to uploads folder
        photos.mv("./uploads/" + `${user_id}-${photos.name}`);
        images.push({
          name: photos.name,
          mimetype: photos.mimetype,
          size: photos.size,
        });
      } else {
        _.forEach(_.keysIn(photos), (key) => {
          let photo = photos[key];

          // move to uploads folder
          photo.mv("./uploads/" + `${user_id}-${photo.name}`);
          images.push({
            name: photo.name,
            mimetype: photo.mimetype,
            size: photo.size,
          });
        });
      }

      // create product and update farmer's products in their model by pushing the product id to the array
      const product = await Product.create({ owner: user_id, name, category, price, description, photos: images });
      if (product) {
        // update farmer's products
        await Farmer.findOneAndUpdate({ user: user_id }, { $push: { products: product._id } });

        return { ...response, msg: "Product created successfully", status: 201, data: product };
      }

      return { ...response, msg: "Could not create product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createProductForFarmer({ owner, photos, category, name, price, description }) {
    try {
      let response = { msg: "", status: null, data: null };
      let images = [];

      // handle file uploads
      if (!_.isArray(photos)) {
        // move to uploads folder
        photos.mv("./uploads/" + `${owner}-${photos.name}`);
        images.push({
          name: photos.name,
          mimetype: photos.mimetype,
          size: photos.size,
        });
      } else {
        // if photos are more than 1
        _.forEach(_.keysIn(photos), (key) => {
          let photo = photos[key];

          // move to uploads folder
          photo.mv("./uploads/" + `${owner}-${photo.name}`);
          images.push({
            name: photo.name,
            mimetype: photo.mimetype,
            size: photo.size,
          });
        });
      }

      // create product and update farmer's products in their model by pushing the product id to the array
      const product = await Product.create({ owner, name, category, price, description, photos: images });
      if (product) {
        // update farmer's products
        await Farmer.findOneAndUpdate({ user: owner }, { $push: { products: product._id } });

        return { ...response, msg: "Product created successfully", status: 201, data: product };
      }

      return { ...response, msg: "Could not create product", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSingleProduct({ product_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingProduct = await Product.findOne({ _id: product_id });

      if (!existingProduct) {
        return { ...response, msg: "Product not found", status: 404 };
      }

      return { ...response, msg: "Product found", status: 200, data: existingProduct };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = ProductRepo;
