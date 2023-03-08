const express = require("express");
const { roles } = require("../config/constants");
const UserController = require("../controllers/users.controller");
const allowRoles = require("../middlewares/allowRoles");
const requireToken = require("../middlewares/requireToken");

module.exports = (app) => {
  let router = express.Router();

  router.get(
    "/user/profile",
    requireToken,
    allowRoles([roles.ADMIN, roles.BUYER, roles.FARMER, roles.LOGISTICS]),
    UserController.getUserProfile,
  );

  router.get("/users", requireToken, allowRoles([roles.ADMIN]), UserController.getAllUsers);

  router.post("/users", requireToken, allowRoles([roles.ADMIN]), UserController.createUser);

  router.patch("/users/:user_id", requireToken, allowRoles([roles.ADMIN]), UserController.editUser);

  router.delete("/users/:user_id", requireToken, allowRoles([roles.ADMIN]), UserController.deleteUser);

  return router;
};
