const express = require("express");

module.exports = (app) => {
  let router = express.Router();

  let authRoutes = require("./auth.routes")(app);
  router.use(authRoutes);

  let productsRoutes = require("./products.routes")(app);
  router.use(productsRoutes);

  let promotionRoutes = require("./promotion.routes")(app);
  router.use(promotionRoutes);

  let categoryRoutes = require("./category.routes")(app);
  router.use(categoryRoutes);

  let kycRoutes = require("./kyc.routes")(app);
  router.use(kycRoutes);

  let orderRoutes = require("./order.routes")(app);
  router.use(orderRoutes);

  let ratingRoutes = require("./rating.routes")(app);
  router.use(ratingRoutes);

  let paymentRoutes = require("./payment.routes")(app);
  router.use(paymentRoutes);

  let usersRoutes = require("./users.routes")(app);
  router.use(usersRoutes);

  let deliveryRoutes = require("./delivery.routes")(app);
  router.use(deliveryRoutes);

  let locationRoutes = require("./location.routes")(app);
  router.use(locationRoutes);

  return router;
};
