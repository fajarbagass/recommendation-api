const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use(express.static("public"));

app.use("/public/users", express.static("public/users"));
app.use("/public/products", express.static("public/products"));
app.use("/public/payments", express.static("public/payments"));
app.use("/public/reviews", express.static("public/reviews"));

// app.use(fileUpload({ useTempFiles: true }));

require("dotenv").config();

/** install cors*/
app.use(cors());

/** install body parser*/
app.use(express.urlencoded({ extended: true }));

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
