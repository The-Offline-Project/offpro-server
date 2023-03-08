const express = require("express");
const OrdersController = require("../controllers/orders.controller");
const requireToken = require("../middlewares/requireToken");
const allowRoles = require("../middlewares/allowRoles");
const { roles } = require("../config/constants");

module.exports = (app) => {
  let router = express.Router();

  router.get("/admin/orders/:order_id", requireToken, allowRoles([roles.ADMIN]), OrdersController.getSingleOrder);

  router.patch("/admin/orders/:order_id", requireToken, allowRoles([roles.ADMIN]), OrdersController.editOrder);

  router.delete("/admin/orders/:order_id", requireToken, allowRoles([roles.ADMIN]), OrdersController.deleteOrder);

  router.post("/orders", requireToken, allowRoles([roles.BUYER]), OrdersController.placeBuyerOrder);

  router.get("/buyer/orders", requireToken, allowRoles([roles.BUYER]), OrdersController.getBuyerOrders);

  router.get("/buyer/orders/:order_id", requireToken, allowRoles([roles.BUYER]), OrdersController.getSingleBuyerOrder);

  return router;
};
