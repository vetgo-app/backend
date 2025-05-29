var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// INSCRIPTION  D'UN UTILISATEUR PARTICULIER
router.post("/signUp", function (req, res) {
  if (!checkBody(req.body, ["firstname", "lastname", "email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      return res.json({ result: false, error: "Email already exists" });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        role: "Utilisateur",
        photo: null || req.body.photo,
      });

      newUser
        .save()
        .then((data) => {
          res.json({ result: true, user: data });
        })
        .catch((err) => {
          res.json({ result: false, error: err.message });
        });
    }
  });
});

// CONNEXION D'UN UTILISATEUR PARTICULIER
router.post("/signin", function (req, res) {
  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email: req.body.email })
    .lean()
    .then((data) => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          // console.log('je suis dans le BACKEND')
          res.json({ result: true, user: data });
        } else {
          res.json({ result: false, error: "Invalid password" });
        }
      } else {
        res.json({ result: false, error: "Email not found" });
      }
    })
    .catch((err) => {
      return res.json({ result: false, error: err.message });
    });
});

// --------------------PARTICULIER--------------------------------------------------POSE D'UN RDV

router;

router.get("/canBookRdv/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

// --------------------PROFESSIONNEL---------------------------------------------------INSCRIPTION D'UN UTILISATEUR
router.post("/signUpPro", function (req, res) {
  if (!checkBody(req.body, ["firstname", "lastname", "email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      return res.json({ result: false, error: "Email already exists" });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        role: "Professionnel",
        photo: null || req.body.photo,
      });

      newUser
        .save()
        .then((data) => {
          return res.json({ result: true, token: data.token });
        })
        .catch((err) => {
          return res.json({ result: false, error: err.message });
        });
    }
  });
});

// -----------PROFESSIONNEL--------------------------------------------CONNEXION D'UN UTILISATEUR
router.post("/signInPro", function (req, res) {
  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          return res.json({
            // correction, envoyer toutes les infos necessaires
            result: true,
            _id: data._id, // pour la relation des collections user et store
            token: data.token,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            photo: data.photo,
          });
        } else {
          return res.json({ result: false, error: "Invalid password" });
        }
      } else {
        return res.json({ result: false, error: "Email not found" });
      }
    })
    .catch((err) => {
      return res.json({ result: false, error: err.message });
    });
});

module.exports = router;
