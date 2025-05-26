require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var storesRouter = require("./routes/store");
var faqRouter = require("./routes/faq");
var appointmentsRouter = require("./routes/appointments");
var petDocumentsRouter = require("./routes/petDocuments");

var app = express();

const cors = require("cors"); // Flow back - front protection
app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

require("./models/connection"); // Connection to Mongo DB

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/store", storesRouter);
app.use("/faq", faqRouter);
app.use("/appointments", appointmentsRouter);
app.use("/petDocuments", petDocumentsRouter);

module.exports = app;
