const Entreprise = require('../models/Entreprise.model');
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
    nomEntreprise,
    nomInterlocuteur,
    prenomInterlocuteur,
    fonction,
    telephone,
    email,
    lieuxActivite,
    nombreSalaire,
    siteWeb,
    uploadLogo,
    password,
  } = req.body;

  try {
    const entreprise = await Entreprise.create({
      nomEntreprise,
      nomInterlocuteur,
      prenomInterlocuteur,
      fonction,
      telephone,
      email,
      lieuxActivite,
      nombreSalaire,
      siteWeb,
      uploadLogo,
      password,
    });
    res.status(201).json({ entreprise: entreprise._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  console.log('par ici ****');
  const { email, password } = req.body;

  try {
    const entreprise = await Entreprise.login(email, password);
    const token = createToken(entreprise._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
    res.status(200).json({ entreprise: entreprise._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// lecture d'une seul entreprise
module.exports.readOneEntreprise = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Entreprise.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

// update a candidat
module.exports.updatEntreprise = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const entreprise = await Entreprise.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!entreprise) {
    return res.status(400).json({ error: "Votre id n'existe pas" });
  }

  res.status(200).send(entreprise);
};
