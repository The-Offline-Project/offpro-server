const CryptoHelper = require("../config/crypto-helper");
const Coupon = require("../models/coupon.model");
const PromoCode = require("../models/promo-code.model");
const Farmer = require("../models/farmer.model");
const SpecialEvent = require("../models/special-event.model");

class PromotionsRepo {
  static async createSpecialEvent({ product, farmer, quantity, name, startDate, endDate, coupon, promoCode }) {
    try {
      let response = { msg: "", status: null, data: null };

      const farmerProfile = await Farmer.findOne({ user: farmer });

      const specialEvent = await SpecialEvent.create({
        product,
        name,
        startDate,
        endDate,
        farmer: farmerProfile._id,
        quantityAvailable: quantity,
        coupon,
        promoCode,
      });

      if (specialEvent) {
        return { ...response, msg: "Special event created successfully", status: 201, data: specialEvent };
      }

      return { ...response, msg: "Could not create special event", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSpecialEvents() {
    try {
      let response = { msg: "", status: null, data: null };

      const specialEvents = await SpecialEvent.find();

      if (specialEvents.length === 0) {
        return { ...response, msg: "There are no special events", status: 200, data: specialEvents };
      }

      return { ...response, msg: "Special events retrieved successfully", status: 200, data: specialEvents };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSingleEvent({ event_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingEvent = await SpecialEvent.findOne({ _id: event_id });

      if (!existingEvent) {
        return { ...response, msg: "Special event does not exist", status: 404 };
      }

      return { ...response, msg: "Special event retrieved successfully", status: 200, data: existingEvent };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async updateSpecialEvent({
    event_id,
    product,
    farmer,
    quantity,
    name,
    startDate,
    endDate,
    coupon,
    promoCode,
  }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingEvent = await SpecialEvent.findOne({ _id: event_id });
      if (!existingEvent) {
        return { ...response, msg: "Special event does not exist", status: 404 };
      }

      const updatedEvent = await SpecialEvent.findOneAndUpdate(
        { _id: event_id },
        {
          product,
          farmer,
          quantityAvailable: quantity,
          name,
          startDate,
          endDate,
          coupon,
          promoCode,
        },
        { new: true },
      );

      if (updatedEvent) {
        return { ...response, msg: "Special event updated successfully", status: 200, data: updatedEvent };
      }

      return { ...response, msg: "Could not update special event", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteSpecialEvent({ event_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingEvent = await SpecialEvent.findOne({ _id: event_id });

      if (!existingEvent) {
        return { ...response, msg: "Special event does not exist", status: 404 };
      }

      const deletedEvent = await SpecialEvent.findOneAndDelete({ _id: event_id });

      if (deletedEvent) {
        return { ...response, msg: "Special event deleted successfully", status: 200, data: deletedEvent };
      }

      return { ...response, msg: "Could not delete special event", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createPromoCode({ discount, expiresAt }) {
    try {
      let response = { msg: "", status: null, data: null };

      // generate a random code as promo code
      const generatedCode = await CryptoHelper.generatePromoCode();

      const promoCode = await PromoCode.create({ code: generatedCode, discount, expiresAt });

      if (promoCode) {
        return { ...response, msg: "Promo code created successfully", status: 201, data: promoCode };
      }

      return { ...response, msg: "Could not generate promo code", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deletePromoCode({ promo_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingPromoCode = await PromoCode.findOne({ _id: promo_id });

      if (!existingPromoCode) {
        return { ...response, msg: "Promo code does not exist", status: 404 };
      }

      const deletedPromoCode = await PromoCode.findOneAndDelete({ _id: promo_id });

      if (deletedPromoCode) {
        return { ...response, msg: "Promo code deleted successfully", status: 200, data: deletedPromoCode };
      }

      return { ...response, msg: "Could not delete promo code", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editPromoCode({ promo_id, discount, isValid, expiresAt }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingPromoCode = await PromoCode.findOne({ _id: promo_id });

      if (!existingPromoCode) {
        return { ...response, msg: "Promo code does not exist", status: 404 };
      }

      const updatedPromoCode = await PromoCode.findOneAndUpdate(
        { _id: promo_id },
        {
          discount,
          isValid: isValid ? isValid : existingPromoCode.isValid,
          expiresAt: expiresAt ? expiresAt : existingPromoCode.expiresAt,
        },
        { new: true },
      );

      if (updatedPromoCode) {
        return { ...response, msg: "Promo code updated successfully", status: 200, data: updatedPromoCode };
      }

      return { ...response, msg: "Could not update promo code", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSinglePromoCode({ promo_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCode = await PromoCode.findOne({ _id: promo_id });

      if (!existingCode) {
        return { ...response, msg: "Promo code does not exist", status: 404 };
      }

      return { ...response, msg: "Promo code retrieved successfully", status: 200, data: existingCode };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getAllPromoCodes() {
    try {
      let response = { msg: "", status: null, data: null };

      const codes = await PromoCode.find();

      if (codes.length === 0) {
        return { ...response, msg: "There are no promo codes", status: 200, data: codes };
      }

      return { ...response, msg: "Promo codes retrieved successfully", status: 200, data: codes };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getAllCoupons() {
    try {
      let response = { msg: "", status: null, data: null };

      const coupons = await Coupon.find();

      if (coupons.length === 0) {
        return { ...response, msg: "There are no coupons", status: 200, data: coupons };
      }

      return { ...response, msg: "Coupons retrieved successfully", status: 200, data: coupons };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createCoupon({ product_id, numberOfCouponsAvailable, couponPrice, startDate, endDate }) {
    try {
      let response = { msg: "", status: null, data: null };

      // generate a random code as coupon code
      const generatedCode = await CryptoHelper.generateCouponCode();

      const coupon = await Coupon.create({
        code: generatedCode,
        product: product_id,
        couponPrice,
        numberOfCouponsAvailable,
        startDate,
        endDate,
      });

      if (coupon) {
        return { ...response, msg: "Coupon created successfully", status: 201, data: coupon };
      }

      return { ...response, msg: "Could not generate coupon", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error.message);
    }
  }

  static async getSingleCoupon({ coupon_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCoupon = await Coupon.findOne({ _id: coupon_id });

      if (!existingCoupon) {
        return { ...response, msg: "Coupon does not exist", status: 404 };
      }

      return { ...response, msg: "Coupon retrieved successfully", status: 200, data: existingCoupon };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteCoupon({ coupon_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCoupon = await Coupon.findOne({ _id: coupon_id });

      if (!existingCoupon) {
        return { ...response, msg: "Promo code does not exist", status: 404 };
      }

      const deletedCoupon = await Coupon.findOneAndDelete({ _id: coupon_id });

      if (deletedCoupon) {
        return { ...response, msg: "Coupon deleted successfully", status: 200, data: deletedCoupon };
      }

      return { ...response, msg: "Could not delete coupon", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editCoupon({ coupon_id, couponPrice, numberOfCouponsAvailable, startDate, endDate }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingCoupon = await Coupon.findOne({ _id: coupon_id });

      if (!existingCoupon) {
        return { ...response, msg: "Coupon does not exist", status: 404 };
      }

      const updatedCoupon = await Coupon.findOneAndUpdate(
        { _id: coupon_id },
        { couponPrice, numberOfCouponsAvailable, startDate, endDate },
        { new: true },
      );

      if (updatedCoupon) {
        return { ...response, msg: "Coupon updated successfully", status: 200, data: updatedCoupon };
      }

      return { ...response, msg: "Could not update coupon", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = PromotionsRepo;
