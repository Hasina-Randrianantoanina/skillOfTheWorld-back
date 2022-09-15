const Entreprise = require("../models/Entreprise.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signUperrors, signInerrors } = require("../utils/error.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valide pendant 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const {
    nomEntreprise,
    lieuxActivite,
    nom,
    prenom,
    fonction,
    telephone,
    nombreSalarie,
    siteInternet,
    logoUrl,
    email,
    password,
  } = req.body;

  try {
    const entreprise = await Entreprise.create({
      nomEntreprise,
      lieuxActivite,
      nom,
      prenom,
      fonction,
      telephone,
      nombreSalarie,
      siteInternet,
      logoUrl,
      email,
      password,
    });
    res.status(201).json({ entreprise: entreprise._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  console.log("par ici ****");
  const { email, password } = req.body;

  try {
    const entreprise = await Entreprise.login(email, password);
    const token = createToken(entreprise._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
    res.status(200).json({ entreprise: entreprise._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
