const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_CLUSTER;
const NAME = process.env.DB_NAME;

module.exports = {
  roles: {
    BUYER: "buyer",
    ADMIN: "admin",
    FARMER: "farmer",
    LOGISTICS: "logistics",
  },
  db: {
    URL: `mongodb+srv://${USER}:${PASS}@cluster0.ug7frlj.mongodb.net/?retryWrites=true&w=majority`,
  },
  stripe: {
    KEY: "",
  },
};
//
