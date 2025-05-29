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
        //console.log("id", data);
      });
  } else {
    Store.find()
      .populate("user") //populate permet de récuperer toute la collection user et pas seulement la ligne id user
      .then((data) => {
        //console.log(data);
        res.json({ result: true, data }); // => data va être un TABLEAU (documentS)
      });
  }
});

router.post("/addStore", async function (req, res) {
  console.log("body add store ", req.body);

  if (
    !req.body.specialization ||
    !req.body.occupation ||
    !req.body.price ||
    !req.body.address
  ) {
    return res.json({ result: false, message: "un des champs est manquants" });
  }

  try {
    // On construit l'adresse complète
    const { street, zipCode, city } = req.body.address;
    const fullAddress = `${street}, ${zipCode} ${city}`;

    // On appelle l'API de géocodage du gouvernement
    const geoResponse = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
        fullAddress
      )}&limit=1`
    );
    const geoData = await geoResponse.json();

    // vérifie que l’API renvoie bien une adresse, extrait la latitude et la longitude, et les stocke dans un objet geo prêt à être enregistré en base de données.
    let geo = null;
    if (geoData && geoData.features && geoData.features.length > 0) {
      const [lon, lat] = geoData.features[0].geometry.coordinates;
      geo = { lat, lon }; //On crée un objet geo contenant les deux coordonnées qui est ensuite ajouté dans address.geo lors de la création du professionnel
    }

    // On construit l'objet store avec geo ajouté dans address
    const newStore = new Store({
      user: req.body.user,
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
      address: {
        ...req.body.address, // copie tous les champs d'adresse (street, city, zipCode...)
        geo, // ajoute un champ geo: { lat, lon }
      },
    }); // "..." : spread operator qui permet de fusionner body.address et geo

    await newStore.save(); //On dit à JavaScript d’attendre que l’enregistrement soit terminé avant de continuer
    res.json({ result: true, message: "store add" }); //Une fois l’enregistrement réussi, réponse json et dans le front on a :{result: true, message: "store add"}
  } catch (error) {
    console.error("Erreur lors de l'ajout du store :", error); //catch error c'est pour que le bloc s'execute si une erreur dans le try (pb d'API ou MongoDB)
    res.status(500).json({ result: false, message: "Erreur serveur" }); //On renvoie une erreur HTTP 500 (erreur serveur) et renvoie au frontend : {result: false, message:'erreur serveur'}
  }
});

module.exports = router;
// router.post('/addStore', (req,res))
