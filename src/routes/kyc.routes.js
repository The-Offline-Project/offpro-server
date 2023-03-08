const express = require("express");
const { roles } = require("../config/constants");
const KycController = require("../controllers/kyc.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/kyc/farmer/:email", allowRoles([roles.FARMER]), KycController.getFarmerProfile);

  router.get("/kyc/buyer/:id", allowRoles([roles.BUYER]), KycController.getBuyerProfile);

  router.get("/kyc/logistics/:id", allowRoles([roles.LOGISTICS]), KycController.getLogisticsProfile);

  router.patch("/kyc/farmer/:id", allowRoles([roles.FARMER]), KycController.updateFarmerProfile);

  router.patch("/kyc/buyer/:id", requireToken, allowRoles([roles.BUYER]), KycController.updateBuyerProfile);

  router.patch("/kyc/logistics/:id", requireToken, allowRoles([roles.LOGISTICS]), KycController.updateLogisticsProfile);

  return router;
};
