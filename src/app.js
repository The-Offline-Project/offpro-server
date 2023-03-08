require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const swaggerDoc = require("./swagger.json");

const app = express();

global.__basedir = __dirname;

//origins to be allowed{cl}
const originsWhitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "http://192.168.0.100",
  "http://192.168.0.101",
  "http://192.168.0.102",
  "*",
];

let corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true,
};

// Middlewares
app.disable("x-powered-by");
app.use(fileUpload({ createParentPath: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static("uploads"));

// swagger config
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { customSiteTitle: "E-Fama API" }));

// redirect main route to docs
app.get("/", function rootHandler(req, res, next) {
  res.redirect("/docs");
});

// load all routes
const routes = require("./routes/index")(app);
app.use("/api/v1", routes);

module.exports = app;
