const KycRepo = require("../repositories/kyc.repo");

class KycController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getFarmerProfile(req, res) {
    try {
      const { id } = req.params;
      const response = KycRepo.getFarmerProfile(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getLogisticsProfile(req, res) {
    try {
      const { id } = req.params;
      const response = KycRepo.getLogisticsProfile(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getBuyerProfile(req, res) {
    try {
      const { id } = req.params;
      const response = await KycRepo.getBuyerProfile(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async updateFarmerProfile(req, res) {
    try {
      const { id } = req.params;
      const { query } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "Farmer ID is required" });
      }
      const response = await KycRepo.updateFarmerProfile({ id, query });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async updateBuyerProfile(req, res) {
    try {
      const { id } = req.params;
      const { query } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "Buyer ID is required" });
      }
      const response = await KycRepo.updateBuyerProfile({ id, query });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async updateLogisticsProfile(req, res) {
    try {
      const { id } = req.params;
      const { query } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "Logistics ID is required" });
      }
      const response = await KycRepo.updateLogisticsProfile({ id, query });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = KycController;
