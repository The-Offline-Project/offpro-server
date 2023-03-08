const ProductRepo = require("../repositories/product.repo");

class ProductController {
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllProducts(req, res) {
    try {
      const response = await ProductRepo.getAllProducts();

      return res.status(200).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getFarmerInventory(req, res) {
    try {
      const { id: user_id } = req.user;

      const response = await ProductRepo.getFarmerInventory({ user_id });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async editProduct(req, res) {
    try {
      const { product_id } = req.params;
      const { category, name, description, price, isApproved } = req.body;

      if (!product_id) {
        return res.status(400).json({ msg: "Product ID is required" });
      }

      const response = await ProductRepo.editProduct({ product_id, isApproved, category, name, price, description });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async editFarmerProduct(req, res) {
    try {
      const { id: user_id } = req.user;
      const { product_id } = req.params;
      const { category, name, description, price } = req.body;
      // TODO? handle upload of photos

      if (!product_id) {
        return res.status(400).json({ msg: "Product ID is required" });
      }

      const response = await ProductRepo.editFarmerProduct({ user_id, product_id, category, name, price, description });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteProduct(req, res) {
    try {
      const { product_id } = req.params;
      const { user_id } = req.query; // this will be user id of the farmer

      if (!product_id) {
        return res.status(400).json({ msg: "Product ID is required" });
      }

      const response = await ProductRepo.deleteProduct({ user_id, product_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteFarmerProduct(req, res) {
    try {
      const { id: user_id } = req.user;
      const { product_id } = req.params;

      if (!product_id) {
        return res.status(400).json({ msg: "Product ID is required" });
      }

      const response = await ProductRepo.deleteFarmerProduct({
        user_id,
        product_id,
      });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createProductForFarmer(req, res) {
    try {
      const { name, category, description, price, owner } = req.body; // owner has to be the user id, not farmer id
      const photos = req.files.photos;

      if (!req.files) {
        return res.status(400).json({ msg: "Please upload photos of the product" });
      }

      if (!category || !name || !description || !price) {
        return res.status(400).json({ msg: "Please provide all required fields" });
      }

      const response = await ProductRepo.createProductForFarmer({ owner, category, photos, name, price, description });
      if (response.status === 201) {
        return res.status(201).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error: error.message });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createFarmerProduct(req, res) {
    try {
      const { id: user_id } = req.user;
      const { category, name, description, price } = req.body;
      const photos = req.files.photos;

      if (!req.files) {
        return res.status(400).json({ msg: "Please upload photos of the product" });
      }

      if (!category || !name || !description || !price) {
        return res.status(400).json({ msg: "Please provide all required fields" });
      }

      const response = await ProductRepo.createFarmerProduct({ user_id, category, photos, name, price, description });
      if (response.status === 201) {
        return res.status(201).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error: error.message });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSingleProduct(req, res) {
    try {
      const { product_id } = req.params;

      if (!product_id) {
        return res.status(400).json({ msg: "Product ID is required" });
      }

      const response = await ProductRepo.getSingleProduct({ product_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }
}

module.exports = ProductController;
