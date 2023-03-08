require("dotenv").config();

const http = require("http");
const app = require("./app");
const { connectDatabase } = require("./config/database");
const { NearApi } = require("./config/near");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, HOST, async () => {
  try {
    // connect to database
    const db = await connectDatabase();
    // const near = new NearApi("testnet");

    // const nearConnection = await near.initialize();

    if (db) {
      // console.log("Near connection initialised");
      console.log(`Database connected to ${db.host}`);
      console.log(`Server running at ${HOST}:${PORT}`);
    }
  } catch (error) {
    console.log("error connecting to server", error);
  }
});
