var express = require("express");
var router = express.Router();

require("../models/connection");

const HealthJournal = require("../models/healthJournal");

router.get('/', (req, res) => {
    HealthJournal.find().then(data => {
        res.json({animalInformations: data})
    })
})

module.exports = router;