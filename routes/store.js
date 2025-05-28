var express = require("express");
var router = express.Router();

require("../models/connection");
const Store = require("../models/stores");

router.get("/:storeId?", function (req, res) {
  if (req.params.storeId) {
    Store.findById(req.params.storeId)
      .populate("user") //populate permet de récuperer toute la collection user et pas seulement la ligne id user
      .then((data) => {
        res.json({ result: true, data }); // => data va être un OBJET (document)
        console.log("id", data);
      });
  } else {
    Store.find()
      .populate("user") //populate permet de récuperer toute la collection user et pas seulement la ligne id user
      .then((data) => {
        console.log(data);
        res.json({ result: true, data }); // => data va être un TABLEAU (documentS)
      });
  }
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
      isSelectedL: req.body.isSelectedL,
      isSelectedM: req.body.isSelectedM,
      isSelectedMe: req.body.isSelectedMe,
      isSelectedJ: req.body.isSelectedJ,
      isSelectedV: req.body.isSelectedV,
      isSelectedS: req.body.isSelectedS,
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
