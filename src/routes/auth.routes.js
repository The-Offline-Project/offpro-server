const express = require("express");
const { roles } = require("../config/constants");
const { nearConnection, walletConnection, account } = require("../config/contract");
const AuthController = require("../controllers/auth.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  // router.post("/admin/login", AuthController.adminLogin);
  router.post("/signup", AuthController.signup);
  router.post("/verify-otp", AuthController.verifyOtp);
  router.post("/login", AuthController.generalLogin);
  router.patch(
    "/password",
    AuthController.updatePassword,
  );
  router.get(
    "/logout",
    AuthController.logout,
  );

  return router;
};
