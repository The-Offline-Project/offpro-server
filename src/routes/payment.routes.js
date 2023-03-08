const express = require("express");
const { roles } = require("../config/constants");
const PaymentController= require("../controllers/payment.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");


module.exports = (app) => {
    let router = express.Router();
  
    router.post("/payment/product", PaymentController.createProductPaymentLink);
  
  
    return router;
  };
  