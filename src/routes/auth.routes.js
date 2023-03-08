const express = require("express");
const { roles } = require("../config/constants");
const { nearConnection, walletConnection, account } = require("../config/contract");
const AuthController = require("../controllers/auth.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  // this is temporal - to test the near initialization
  router.post("/near", async (req, res) => {
    try {
      const connextioned = await nearConnection();
      console.log("🚀 ~ connextioned", connextioned);

      const wallet = await account();
      console.log("🚀 ~ wallet", wallet);
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json(JSON.stringify(error));
    }
  });

  router.post("/admin/login", AuthController.adminLogin);
  router.post("/signup", AuthController.signup);
  router.post("/verify-otp", AuthController.verifyOtp);
  router.post("/login", AuthController.generalLogin);
  router.patch(
    "/password",
    requireToken,
    allowRoles([roles.ADMIN, roles.FARMER, roles.BUYER, roles.LOGISTICS]),
    AuthController.updatePassword,
  );
  router.get(
    "/logout",
    requireToken,
    allowRoles([roles.ADMIN, roles.FARMER, roles.BUYER, roles.LOGISTICS]),
    AuthController.logout,
  );

  return router;
};
