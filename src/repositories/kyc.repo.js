const farmer = require("./../models/farmer.model");
const buyer = require("../models/buyer.model");
const logistic = require("../models/logistic.model");

class KycRepo {
  static async getFarmerProfile(id) {
    let response = { msg: "", status: null, data: null };

    const farmerProfile = await farmer.findOne({ user: id });

    if (!farmerProfile) {
      return { ...response, msg: " profile doesnt exist", status: 200, data: farmerProfile };
    }

    return { ...response, msg: " profile retrieved successfully", status: 200, data: farmerProfile };
  }

  static async getBuyerProfile(id) {
    let response = { msg: "", status: null, data: null };

    const buyerProfile = await buyer.findOne({ user: id });

    if (!buyerProfile) {
      return { ...response, msg: "profile doesnt exist", status: 200, data: buyerProfile };
    }

    return { ...response, msg: " profile retrieved successfully", status: 200, data: buyerProfile };
  }

  static async getLogisticsProfile(id) {
    let response = { msg: "", status: null, data: null };

    const logisticProfile = await logistic.findOne({ user: id });

    if (!logisticProfile) {
      return { ...response, msg: " profile doesnt exist", status: 200, data: logisticProfile };
    }

    return { ...response, msg: " profile retrieved successfully", status: 200, data: logisticProfile };
  }

  static async updateFarmerProfile({ farmer_id, query }) {
    let response = { msg: "", status: null, data: null };

    const existingProfile = await farmer.findOne({ user: farmer_id });

    if (!existingProfile) {
      return { ...response, msg: "Profile does not exist", status: 404 };
    }

    const updatedProfile = await farmer.findOneAndUpdate(query);

    if (updatedProfile) {
      return {
        ...response,
        msg: "Profile updated successfully",
        status: 200,
        data: updatedProfile,
      };
    }

    return { ...response, msg: "Could not update profile", status: 400 };
  }

  static async updateBuyerProfile({ buyer_id, query }) {
    let response = { msg: "", status: null, data: null };

    const existingProfile = await buyer.findOne({ user: buyer_id });

    if (!existingProfile) {
      return { ...response, msg: "Profile does not exist", status: 404 };
    }

    const updatedProfile = await buyer.findOneAndUpdate(query);

    if (updatedProfile) {
      return {
        ...response,
        msg: "Profile updated successfully",
        status: 200,
        data: updatedProfile,
      };
    }

    return { ...response, msg: "Could not update profile", status: 400 };
  }

  static async updateLogisticsProfile({ farmer_id, query }) {
    let response = { msg: "", status: null, data: null };

    const existingProfile = await logistic.findOne({ user: farmer_id });

    if (!existingProfile) {
      return { ...response, msg: "Profile does not exist", status: 404 };
    }

    const updatedProfile = await logistic.findOneAndUpdate(query);

    if (updatedProfile) {
      return {
        ...response,
        msg: "Profile updated successfully",
        status: 200,
        data: updatedProfile,
      };
    }

    return { ...response, msg: "Could not update profile", status: 400 };
  }
}

module.exports = KycRepo;
