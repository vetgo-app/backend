var express = require("express");
var router = express.Router();

// Connect to Mongoose
require("../models/connection");
const mongoose = require("mongoose");

const Pet = require("../models/pet");
const uniqid = require("uniqid");

// Add the Cloudinary connection
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../models/users");

//route pour la récupération des animaux sur la page prendre un rdv
router.get("/byOwner/:token", (req, res) => {
  User.findOne({ token: req.params.token }) // on recherche l'utilisateur par son token
    .select("_id") //on selectionne que son id
    .then((data) => {
      if (data) {
        Pet.find({ owner: data._id }) // on cherche ensuite l'animal par rapport au owner connecté et récuperer ci dessus par son token
          .then((data) => {
            res.json({ result: true, pets: data });
          });
      }
    });
});

// Get the information from the FrontEnd
router.post("/", (req, res) => {
  const {
    newName: name,
    newRace: breed,
    newAge: age,
    newBirth: dateOfBirth,
    newWeight: weight,
    newSexe: sexe,
    newIdentification: identification,
    newDocument: documents,
    newType: type,
    token,
  } = req.body.animalInfo;

  User.findOne({ token })
    .select("_id")
    .then((user) => {
      // Creation of the Animal
      const newPet = new Pet({
        name,
        type,
        breed,
        age,
        dateOfBirth,
        weight,
        sexe,
        identification,
        owner: user._id,
        documents,
      });

      // Save the animal
      newPet.save().then((data) => res.json({ result: "Animal ajouté", data }));
    });
});

// Get the information from the pets collection
router.get("/byPet/:petId", (req, res) => {
  Pet.findById(req.params.petId).then((data) => {
    if (!data) {
      res.json({ result: false });
    } else {
      res.json({ result: true, petInfo: data });
    }
  });
});

// Getting the documents from the HealthJournal and Upload the document on Cloudninary
router.post("/:petId", async (req, res) => {
  if (!req.params.petId) {
    res.json({ result: false, error: "Animal ajouté" });
  }

  // Move to temporary file
  const docUniqueId = uniqid();
  const documentPath = `./tmp/${docUniqueId}.pdf`;
  const resultMove = await req.files.animalNewDocument.mv(documentPath);
  const docName = req.files.animalNewDocument?.name;

  if (!resultMove) {
    // Sending the document to Cloudinary
    const resultCloudinary = await cloudinary.uploader.upload(documentPath, {
      public_id: docUniqueId,
    });

    if (resultCloudinary.secure_url) {
      fs.unlinkSync(documentPath);

      await Pet.updateOne(
        { _id: req.params.petId },
        {
          $push: {
            documents: {
              uid: docUniqueId,
              file: resultCloudinary.secure_url?.replace(".pdf", ".jpg"),
              docName: docName,
              date: new Date(),
            },
          },
        }
      );
    }

    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultMove });
  }
});

module.exports = router;
