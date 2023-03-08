const express = require("express");
const { roles } = require("../config/constants");
const CategoryController = require("../controllers/category.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get("/category", CategoryController.getAllCategories);

  router.get("/category/:category_id", CategoryController.getSingleCategory);

  router.post("/category", requireToken, allowRoles([roles.ADMIN]), CategoryController.createCategory);

  router.patch("/category/:category_id", requireToken, allowRoles([roles.ADMIN]), CategoryController.editCategory);

  router.delete("/category/:category_id", requireToken, allowRoles([roles.ADMIN]), CategoryController.removeCategory);

  return router;
};
