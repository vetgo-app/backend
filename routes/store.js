var express = require("express");
var router = express.Router();

require("../models/connection");
const Store = require("../models/stores");

router.get("/", function (req, res) {
  Store.find().then((data) => {
    res.json({ result: true, data });
  });
});

router.post("/addStore", function (req, res) {
  console.log("body add store ", req.body);
  if (
    !req.body.specialization ||
    !req.body.occupation ||
    !req.body.price || // le ! va permettre de savoir si la condition est false
    !req.body.address
  ) {
    res.json({ result: false, message: "un des champs est manquants" });
  } else {
    const newStore = new Store({
      user: req.body.user, // relation entre les collections user et store
      specialization: req.body.specialization,
      occupation: req.body.occupation,
      price: req.body.price,
      isSelectedUrgence: req.body.isSelectedUrgence,
      isSelectedVisio: req.body.isSelectedVisio,
      isSelectedDom: req.body.isSelectedDom,
      address: req.body.address,
    });
    newStore.save().then(() => {
      res.json({ result: true, message: "store add" });
    });
  }
});

module.exports = router;
// router.post('/addStore', (req,res))
