var express = require("express");
var router = express.Router();

require("../models/connection");
const Store = require("../models/appointment");
const { checkBody } = require("../modules/checkBody");
const Appointment = require("../models/appointment");

router.get("/", (req, res) => {
  Appointment.find().then((data) => res.json({ result: true, data }));
});

router.post("/add", (req, res) => {
  console.log({
    user: req.body.user,
    store: req.body.store,
    pet: req.body.pet,
    date: req.body.date,
    price: req.body.price,
    reason: req.body.reason,
    firstRdv: req.body.firstRdv || false,
    isMyAnimal: req.body.isMyAnimal || false,
  });

  if (
    !checkBody(req.body, ["user", "store", "pet", "date", "price", "reason"])
  ) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  console.log({
    user: req.body.user,
    store: req.body.store,
    pet: req.body.pet,
    date: req.body.date,
    price: req.body.price,
    reason: req.body.reason,
    firstRdv: req.body.firstRdv || false,
    isMyAnimal: req.body.isMyAnimal || false,
  });

  const newAppointment = new Appointment({
    user: req.body.user,
    store: req.body.store,
    pet: req.body.pet,
    date: req.body.date,
    price: req.body.price,
    reason: req.body.reason,
    firstRdv: req.body.firstRdv || false,
    isMyAnimal: req.body.isMyAnimal || false,
  });

  newAppointment
    .save()
    .then((data) => {
      return res.json({ result: true, appointment: data });
    })
    .catch((err) => {
      return res.json({ result: false, error: err.message });
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
