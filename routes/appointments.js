var express = require("express");
var router = express.Router();

require("../models/connection");
const Store = require("../models/appointment");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const Appointment = require("../models/appointment");

router.get("/myRdv/:token", (req, res) => {
  User.findOne({ token: req.params.token }) // on recherche l'utilisateur par son token
    .then((data) => {
      console.log(data);
      if (data) {
        Appointment.find({ user: data._id }) // on cherche ensuite le rdv par rapport au user connecté et récuperer ci dessus par son token
          .then((data) => {
            res.json({ result: true, data });
          });
      }
    });
});

router.get("/byPet/:petId", (req, res) => {
  Pet.findById(req.params.petId).then((data) => {
    if (!data) {
      res.json({ result: false });
    } else {
      res.json({ result: true, petInfo: data });
    }
  });
});

router.post("/add", (req, res) => {
  if (
    !checkBody(req.body, ["user", "store", "pet", "date", "price", "reason"])
  ) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  console.log('Adding appoo');

  User.findOne({ token: req.body.user }) // on recherche l'utilisateur par son token
    .then((data) => {
      const newAppointment = new Appointment({
        user: data._id,
        store: req.body.store,
        pet: req.body.pet,
        date: req.body.date,
        price: req.body.price,
        reason: req.body.reason,
        firstRdv: req.body.firstRdv || false,
        isMyAnimal: req.body.isMyAnimal || false,
      });

      console.log('in user find');

      newAppointment
        .save()
        .then((data) => {
          console.log('appoiuntment save');

          return res.json({ result: true, appointment: data });
        })
        .catch((err) => {
          console.error('err', err.message)

          return res.json({ result: false, error: err.message });
        });
    });
});

router.delete("/deleteRDV/:_id", (req, res) => {
  //recuperer l'id dans l'url
  Appointment.findByIdAndDelete(req.params._id).then((data) => {
    // cherche le document propre à l'id et le supprimer
    Appointment.find().then((data) => res.json({ rdv: data })); //afficher toute la collection appointment après suppression du doc
  });
});

module.exports = router;
