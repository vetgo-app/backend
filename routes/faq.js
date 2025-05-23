var express = require("express");
var router = express.Router();

require("../models/connection");

const Faq = require("../models/faq");

router.get('/', (req, res) => {
    Faq.find().then(data => {
        res.json({FAQ: data})
    })
})

module.exports = router;