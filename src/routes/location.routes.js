const express = require("express");
const axios = require("axios");

module.exports = (app) => {
  let router = express.Router();
  router.get("/location", getLocation);
  return router;
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *  */
function getLocation(req, res) {
  fetch("https://api.db-ip.com/v2/free/self")
    .then(
      ((response) => res.status(200).json(response.data))
    );
}
