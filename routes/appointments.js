var express = require("express");
var router = express.Router();

require("../models/connection");

const Appointments = require("../models/appointments");

router.get('/', (req, res) => {
    Appointments.find().then(data => {
        res.json({Overview: data})
    })
})

module.exports = router;