const { Schema, model } = require("mongoose");

const inventoryModel = new Schema({
   products :[String],
    farmer_id:Number
});

const inventory = model("inventory",inventoryModel);
module.exports=inventory