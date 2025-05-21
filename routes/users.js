var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/user');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// INSCRIPTION  D'UN UTILISATEUR
router.post('/signup', function(req, res) {
  if (!checkBody(req.body, ['firstname', 'lastname', 'email', 'password'])) {
    return res.json({ result: false, error: 'Missing or empty fields' });
  }

  User.findOne({email: req.body.email}).then(data => {
    if (data) {
      return res.json({ result: false, error: 'Email already exists' });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        role: 'Utilisateur' || 'Professionnel' || null,
        photo: null || req.body.photo,
      });

      newUser.save().then((data) => {
        return res.json({ result: true, token: data.token });
      }).catch(err => {
        return res.json({ result: false, error: err.message });
      });
    }
  })

// CONNEXION D'UN UTILISATEUR
  router.post('/login', function(req, res) {
    if (!checkBody(req.body, ['email', 'password'])) {
      return res.json({ result: false, error: 'Missing or empty fields' });
    }

    User.findOne({ email: req.body.email }).then(data => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          return res.json({ result: true, token: data.token });
        } else {
          return res.json({ result: false, error: 'Invalid password' });
        }
      } else {
        return res.json({ result: false, error: 'Email not found' });
      }
    }).catch(err => {
      return res.json({ result: false, error: err.message });
    });
  });
}

module.exports = router;
