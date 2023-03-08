require("dotenv").config();
const mongoose = require("mongoose");
const { db } = require("./constants");

mongoose.Promise = Promise;

exports.connectDatabase = async () => {
  try {
    const dbUrl = process.env.NODE_ENV === "development" ? "mongodb://mongo:27017/offproDev" : db.URL;

    mongoose.set("strictQuery", false);

    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    await mongoose.connect(dbUrl, { autoCreate: true });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error:", error);
      process.exit(-1);
    });

    return mongoose.connection;
  } catch (error) {
    console.log("Error connecting to database:> ", error);
  }
};
