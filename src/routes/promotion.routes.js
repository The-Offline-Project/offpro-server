const express = require("express");
const PromotionController = require("../controllers/promotion.controller");
const requireToken = require("../middlewares/requireToken");
const allowRoles = require("../middlewares/allowRoles");
const { roles } = require("../config/constants");

module.exports = (app) => {
  let router = express.Router();

  // PROMO CODES
  router.get("/promo-codes", requireToken, allowRoles([roles.ADMIN]), PromotionController.getAllPromoCodes);

  router.get("/promo-codes/:promo_id", PromotionController.getSinglePromoCode);

  router.post("/promo-codes", requireToken, allowRoles([roles.ADMIN]), PromotionController.createPromoCode);

  router.patch("/promo-codes/:promo_id", requireToken, allowRoles([roles.ADMIN]), PromotionController.editPromoCode);

  router.delete("/promo-codes/:promo_id", requireToken, allowRoles([roles.ADMIN]), PromotionController.deletePromoCode);

  // COUPONS
  router.get("/coupons", requireToken, allowRoles([roles.ADMIN, roles.FARMER]), PromotionController.getAllCoupons);

  router.get(
    "/coupons/:coupon_id",
    requireToken,
    allowRoles([roles.ADMIN, roles.BUYER]),
    PromotionController.getSingleCoupon,
  );

  router.delete("/coupons/:coupon_id", requireToken, allowRoles([roles.ADMIN]), PromotionController.deleteCoupon);

  router.patch("/coupons/:coupon_id", requireToken, allowRoles([roles.ADMIN]), PromotionController.editCoupon);

  router.post("/coupons", requireToken, allowRoles([roles.ADMIN]), PromotionController.createCoupon);

  // SPECIAL EVENTS
  router.get("/special-events", PromotionController.getSpecialEvents);

  router.get("/special-events/:event_id", PromotionController.getSingleEvent);

  router.patch(
    "/special-events/:event_id",
    requireToken,
    allowRoles([roles.ADMIN, roles.FARMER]),
    PromotionController.updateSpecialEvent,
  );

  router.delete(
    "/special-events/:event_id",
    requireToken,
    allowRoles([roles.ADMIN, roles.FARMER]),
    PromotionController.deleteSpecialEvent,
  );

  return router;
};
