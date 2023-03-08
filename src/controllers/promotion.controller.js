const PromotionsRepo = require("../repositories/promotion.repo");

class PromotionController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createSpecialEvent(req, res) {
    try {
      const { name, product, farmer, coupon, quantity, promoCode, startDate, endDate } = req.body;

      if (!name || !farmer || !quantity || !startDate || !endDate) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const response = await PromotionsRepo.createSpecialEvent({
        product,
        name,
        startDate,
        endDate,
        farmer,
        quantity,
        coupon,
        promoCode,
      });

      if (response.status === 201) {
        return res.status(201).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSpecialEvents(req, res) {
    try {
      const response = await PromotionsRepo.getSpecialEvents();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSingleEvent(req, res) {
    try {
      const { event_id } = req.params;

      if (!event_id) {
        return res.status(400).json({ msg: "Event ID is required" });
      }

      const response = await PromotionsRepo.getSingleEvent({ event_id });

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
  static async updateSpecialEvent(req, res) {
    try {
      const { event_id } = req.params;
      const { product, farmer, quantity, name, startDate, endDate, coupon, promoCode } = req.body;

      if (!event_id) {
        return res.status(400).json({ msg: "Event ID is required" });
      }

      const response = await PromotionsRepo.updateSpecialEvent({
        event_id,
        product,
        farmer,
        quantity,
        name,
        startDate,
        endDate,
        coupon,
        promoCode,
      });

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
  static async deleteSpecialEvent(req, res) {
    try {
      const { event_id } = req.params;

      if (!event_id) {
        return res.status(400).json({ msg: "Event ID is required" });
      }

      const response = await PromotionsRepo.deleteSpecialEvent({ event_id });

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
  static async createCoupon(req, res) {
    try {
      const { product_id, numberOfCouponsAvailable, couponPrice, startDate, endDate } = req.body;

      if (!product_id || !numberOfCouponsAvailable || !couponPrice || !startDate || !endDate) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const response = await PromotionsRepo.createCoupon({
        product_id,
        numberOfCouponsAvailable,
        couponPrice,
        startDate,
        endDate,
      });

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
  static async getSingleCoupon(req, res) {
    try {
      const { coupon_id } = req.params;

      if (!coupon_id) {
        return res.status(400).json({ msg: "Coupon ID is required" });
      }

      const response = await PromotionsRepo.getSingleCoupon({ coupon_id });

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
  static async deleteCoupon(req, res) {
    try {
      const { coupon_id } = req.params;

      if (!coupon_id) {
        return res.status(400).json({ msg: "Coupon ID is required" });
      }

      const response = await PromotionsRepo.deleteCoupon({ coupon_id });

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
  static async editCoupon(req, res) {
    try {
      const { coupon_id } = req.params;
      const { couponPrice, numberOfCouponsAvailable, startDate, endDate } = req.body;

      if (!coupon_id) {
        return res.status(400).json({ msg: "Coupon ID is required" });
      }

      const response = await PromotionsRepo.editCoupon({
        coupon_id,
        couponPrice,
        numberOfCouponsAvailable,
        startDate,
        endDate,
      });

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
  static async getAllCoupons(req, res) {
    try {
      const response = await PromotionsRepo.getAllCoupons();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllPromoCodes(req, res) {
    try {
      const response = await PromotionsRepo.getAllPromoCodes();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSinglePromoCode(req, res) {
    try {
      const { promo_id } = req.params;

      if (!promo_id) {
        return res.status(400).json({ msg: "Promo ID is required" });
      }

      const response = await PromotionsRepo.getSinglePromoCode({ promo_id });

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
  static async deletePromoCode(req, res) {
    try {
      const { promo_id } = req.params;

      if (!promo_id) {
        return res.status(400).json({ msg: "Promo ID is required" });
      }

      const response = await PromotionsRepo.deletePromoCode({ promo_id });

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
  static async editPromoCode(req, res) {
    try {
      const { promo_id } = req.params;
      const { discount, expiresAt, isValid } = req.body;

      if (!promo_id) {
        return res.status(400).json({ msg: "Promo ID is required" });
      }

      const response = await PromotionsRepo.editPromoCode({ promo_id, discount, expiresAt, isValid });

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
  static async createPromoCode(req, res) {
    try {
      const { discount, expiresAt } = req.body;

      if (!discount) {
        return res.status(400).json({ message: "Discount value is required" });
      }

      const response = await PromotionsRepo.createPromoCode({ discount, expiresAt });

      if (response.status === 201) {
        return res.status(201).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = PromotionController;
