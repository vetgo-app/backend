var express = require("express");
var router = express.Router();

require("../models/connection");
const Pet = require("../models/pet");
const { checkBody } = require("../modules/checkBody");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.get("/pet/:id", function (req, res) {
    Pet.findById(req.params.id)
        .populate("owner")
        .then((data) => {
            if (data) {
                return res.json({ result: true, pet: data });
            } else {
                return res.json({ result: false, error: "Pet not found" });
            }
        })
        .catch((err) => {
            return res.json({ result: false, error: err.message });
        });
}
);

router.post('/addPet', (req, res) => {
    if (!checkBody(req.body, ['name', 'type', 'breed', 'age', 'weight'])) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const newPet = new Pet({
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        age: req.body.age,
        weight: req.body.weight,
        photo: null || req.body.photo,
        owner: req.body.owner,
    });

    newPet
        .save()
        .then((data) => {
            return res.json({ result: true, pet: data });
        })
        .catch((err) => {
            return res.json({ result: false, error: err.message });
        });
}
);

module.exports = router;