var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/user");

/* GET home page. */
router.get("/users", function (req, res, next) {
  User.find().then((data) => {
    res.json({ result: true, data });
  });
});

module.exports = router;
