const { Schema, model } = require("mongoose");

const adminModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Admin = model("Admin", adminModel);
module.exports = Admin;
