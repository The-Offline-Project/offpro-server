const { Schema, model } = require("mongoose");

const logisticsModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    line1: { type: String, default: null },
    city: { type: String, default: null },
    town: { type: String, default: null },
    country: { type: String, default: null },
  },
  position: {
    type: String,
    enum: ["driver", "owner"],
  },
  location: { type: String, default: null },
  accountType: { type: String, default: null },
  companySize: { type: String, default: null },
  revenueSize: { type: String, default: null },
  numberOfVehicles: { type: Number, default: null },
  vehicleType: {
    type: String,
    enum: ["motorcycle", "van", "truck", "heavy duty truck"],
  },
  licenseCode: {
    type: String,
    enum: [
      "Code A - motorcycle",
      "Code B [08] - Light motor vehicle",
      "Code C [10] - Heavy motor vehicle",
      "Code D [14] - Combination & Articulated vehicle",
    ],
  },
});

const Logistics = model("Logistics", logisticsModel);

module.exports = Logistics;
