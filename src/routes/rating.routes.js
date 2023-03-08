const express = require("express");
const { roles } = require("../config/constants");
const RatingController = require("../controllers/rating.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.post("/reviews", requireToken, allowRoles([roles.BUYER]), RatingController.reviewOrder);

  router.patch("/reviews/:review_id", requireToken, allowRoles([roles.BUYER]), RatingController.editReview);

  router.delete("/reviews/:review_id", requireToken, allowRoles([roles.BUYER]), RatingController.deleteReview);

  return router;
};
