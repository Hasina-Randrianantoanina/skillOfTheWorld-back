const Candidat = require('../models/Candidat.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongoose').Types.ObjectId;

const { signUperrors, signInErrors } = require('../utils/error.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valide pendant 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const {
    nom,
    prenom,
    dateNaissance,
    localisation,
    email,
    uploadLogo,
    password,
    listLM,
    listCV,
  } = req.body;

  try {
    const candidat = await Candidat.create({
      nom,
      prenom,
      dateNaissance,
      localisation,
      email,
      uploadLogo,
      password,
      listLM,
      listCV,
    });
    res.status(201).json({ candidat: candidat._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  console.log('eto ****');
  const { email, password } = req.body;

  try {
    const candidat = await Candidat.login(email, password);
    const token = createToken(candidat._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
    res.status(200).json({ candidat: candidat._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// lecture d'une seul candidat
module.exports.readOneCandidat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Candidat.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

// ajout de cv au candidat
module.exports.addCV = (req, res) => {
  var myCV = {
    nameCV: `${req.protocol}://${req.get('host')}/cv/${req.file.filename}`,
    isValide: req.body.isValide,
  };

  Candidat.findByIdAndUpdate(
    { _id: req.body.candidatId },
    { $push: { listCV: myCV } },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};
