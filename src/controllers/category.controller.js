const CategoryRepo = require("../repositories/category.repo");

class CategoryController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const response = await CategoryRepo.createCategory({ name });

      if (response.status === 201) {
        return res.status(201).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSingleCategory(req, res) {
    try {
      const { category_id } = req.params;

      if (!category_id) {
        return res.status(400).json({ msg: "Category ID is required" });
      }

      const response = await CategoryRepo.getSingleCategory({ category_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllCategories(req, res) {
    try {
      const response = await CategoryRepo.listAllCategories();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async editCategory(req, res) {
    try {
      const { category_id } = req.params;
      const { name } = req.body;

      if (!category_id) {
        return res.status(400).json({ msg: "Category ID is required" });
      }

      const response = await CategoryRepo.editCategory({ category_id, name });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async removeCategory(req, res) {
    try {
      const { category_id } = req.params;

      if (!category_id) {
        return res.status(400).json({ msg: "Category ID is required" });
      }

      const response = await CategoryRepo.removeCategory({ category_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = CategoryController;
