var express = require("express");
var router = express.Router();

require("../models/connection");
const Store = require("../models/appointment");
const { checkBody } = require("../modules/checkBody");

router.post("/addAppointment", (req, res) => {
    if (!checkBody(req.body, ['user', 'store', 'pet', 'date', 'price', 'Reason'])) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const newAppointment = new Store({
        user: req.body.user,
        store: req.body.store,
        pet: req.body.pet,
        date: req.body.date,
        price: req.body.price,
        Reason: req.body.Reason,
        firstRdv: req.body.firstRdv || false,
        isMyAnimal: req.body.isMyAnimal || false,
    })

    newAppointment
        .save()
        .then((data) => {
            return res.json({ result: true, appointment: data });
        })
        .catch((err) => {
            return res.json({ result: false, error: err.message });
        });
});

module.exports = router;