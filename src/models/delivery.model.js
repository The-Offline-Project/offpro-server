


const { Schema, model } = require("mongoose");

const deliveryModel = new Schema({
  Destination: String,
  Source: String,
  buyer_id: Number,
  order_id: Number,
  logistics_id: Number,
});
const delivery = model("delivery",deliveryModel);
module.exports=delivery




