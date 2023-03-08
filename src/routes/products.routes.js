const express = require("express");
const { roles } = require("../config/constants");
const ProductController = require("../controllers/product.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  // General
  router.get("/products", ProductController.getAllProducts);

  router.get("/products/:product_id", ProductController.getSingleProduct);

  // Admin
  router.post("/admin/products", requireToken, allowRoles([roles.ADMIN]), ProductController.createProductForFarmer);

  router.patch("/admin/products/:product_id", requireToken, allowRoles([roles.ADMIN]), ProductController.editProduct);

  router.delete(
    "/admin/products/:product_id",
    requireToken,
    allowRoles([roles.ADMIN]),
    ProductController.deleteProduct,
  );

  // Farmer
  router.get("/farmer/inventory", requireToken, allowRoles([roles.FARMER]), ProductController.getFarmerInventory);

  router.post("/farmer/products", requireToken, allowRoles([roles.FARMER]), ProductController.createFarmerProduct);

  router.patch(
    "/farmer/products/:product_id",
    requireToken,
    allowRoles([roles.FARMER]),
    ProductController.editFarmerProduct,
  );

  router.delete(
    "/farmer/products/:product_id",
    requireToken,
    allowRoles([roles.FARMER]),
    ProductController.deleteFarmerProduct,
  );

  return router;
};
