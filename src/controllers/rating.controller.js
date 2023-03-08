const RatingRepo = require("../repositories/rating.repo");

class RatingController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async reviewOrder(req, res) {
    try {
      const { id } = req.user;
      const { farmer_id, order_id, rating, comment } = req.body;

      if (!farmer_id || !order_id || !rating) {
        return res.status(400).json({ msg: "Order ID, Farmer ID and rating are required" });
      }

      const response = await RatingRepo.rateOrder({ buyer_id: id, farmer_id, order_id, rating, comment });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

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
  static async deleteReview(req, res) {
    try {
      const { id: user_id } = req.user;
      const { review_id } = req.params;

      if (!review_id) {
        return res.status(400).json({ msg: "Review ID is required" });
      }

      const response = await RatingRepo.deleteReview({ user_id, review_id });

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
  static async editReview(req, res) {
    try {
      const { id: user_id } = req.user;
      const { review_id } = req.params;
      const { rating, comment } = req.body;

      if (!review_id) {
        return res.status(400).json({ msg: "Review ID is required" });
      }

      const response = await RatingRepo.editReview({ user_id, review_id, rating, comment });

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

module.exports = RatingController;
