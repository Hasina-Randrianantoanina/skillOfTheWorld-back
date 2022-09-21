const Candidat = require("../models/Candidat.model");
const jwt = require("jsonwebtoken");

const { signUperrors, signInErrors } = require("../utils/error.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valide pendant 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { nom, prenom, dateNaissance, localisation, email, password } =
    req.body;

  try {
    const candidat = await Candidat.create({
      nom,
      prenom,
      dateNaissance,
      localisation,
      email,
      password,
    });
    res.status(201).json({ candidat: candidat._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  console.log("eto ****");
  const { email, password } = req.body;

  try {
    const candidat = await Candidat.login(email, password);
    const token = createToken(candidat._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
    res.status(200).json({ candidat: candidat._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
