require("dotenv").config();
require("./models/connection"); // require pour la connexionn à la bdd

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var storesRouter = require("./routes/store");
var faqRouter = require("./routes/faq");

var app = express();

const cors = require("cors"); // protextion flux back front
app.use(cors());


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/store", storesRouter);
app.use("/faq", faqRouter);

module.exports = app;
