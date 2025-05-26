var express = require("express");
var router = express.Router();

require("../models/connection");

const Pet = require("../models/pet");

const uniqid = require('uniqid');

// Add the Cloudinary connection
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Get the information from the pets collection 
router.get('/:petId', (req, res) => {
    Pet
        .findById(req.params.petId)
        .then(data => {
            if (!data) {
                res.json({ result: false, error: "No pet found."})
            } else {
                res.json({ result: true, petInfo: data })
            }
        })
});

// Getting the documents from the HealthJournal and Upload the document on Cloudninary
router.post("/:petId", async (req, res) => {
    if (!req.params.petId) {
        res.json({ result: false, error: "Pas de params" });
    }

    const docUniqueId = uniqid()
    const documentPath = `./tmp/${docUniqueId}.pdf`;
    const resultMove = await req.files.animalNewDocument.mv(documentPath);
    const docName = req.files.animalNewDocument?.name;

    if (!resultMove) {
        // Sending the document to Cloudinary
        const resultCloudinary = await cloudinary.uploader.upload(documentPath, { public_id: docUniqueId });

        if (resultCloudinary.secure_url) {
            fs.unlinkSync(documentPath);

            await Pet.updateOne(
                { _id: req.params.petId }, 
                { $push: {
                    "documents": {
                        uid: docUniqueId,
                        file: resultCloudinary.secure_url?.replace(".pdf", ".jpg"),
                        docName: docName,
                        date: new Date(),
                    }
                }}
            )
        }

        res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false, error: resultMove });
    };
});

module.exports = router;