const Candidat = require("../models/Candidat.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valide pendant 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const candidat = new Candidat({
        nom: req.body.nom,
        prenom: req.body.prenom,
        dateNaissance: req.body.dateNaissance,
        localisation: req.body.localisation,
        imageUrl: req.body.imageUrl,
        email: req.body.email,
        password: hash,
      });
      candidat
        .save()
        .then(() => res.status(201).json({ message: "Candidat créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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
    res.status(200).json(err);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
