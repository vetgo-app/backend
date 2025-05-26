var express = require("express");
var router = express.Router();

require("../models/connection");

const HealthJournal = require("../models/healthJournal");
const uniqid = require('uniqid');

// Get the information from the pets collection 
router.get('/', (req, res) => {
    HealthJournal.find().then(data => {
        res.json({ animalInformations: data })
    })
});

// Getting the documents from the HealthJournal
router.post("/", async (req, res) => {
    const documentPath = `./tmp/${uniqid()}.pdf`;
    const resultMove = await req.files.animalNewDocument.mv(documentPath);

    if (!resultMove) {
        res.json({ result: true });
    } else {
        res.json({ result: false, error: resultMove });
    }
});

module.exports = router;