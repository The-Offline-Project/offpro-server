const express = require("express");
const DeliveryController = require("../controllers/delivery.controller");


module.exports = (app) => {
let router = express.Router();
  router.get("/delivery", DeliveryController.getAllDelivery);
  router.post("/delivery", DeliveryController.createDelivery);
  router.delete("/delivery/:id", DeliveryController.deleteDelivery);
  return router;
};
