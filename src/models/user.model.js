const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      maxlength: 50,
    },
    lastname: {
      type: String,
      maxlength: 50,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      maxlength: 50,
      required:[true ,"Username is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password must be at least 6 characters long"],
    },
   
    phone: {
      type: String
    },
    pin: {
      type: String,
      min: [4, "Pin must be at least 4 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "N/A",
    },
    bvn:{
      type: String,

    },
    otp:{
      type:String,
    }
  },
  { timestamps: true },
);

// Mongoose hooks here - if any

const User = model("User", userSchema);

module.exports = User;
