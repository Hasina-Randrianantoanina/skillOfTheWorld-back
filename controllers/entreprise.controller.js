const Entreprise = require("../models/Entreprise.model");
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
      const entreprise = new Entreprise({
        nomEntreprise: req.body.nomEntreprise,
        lieuxActivite: req.body.lieuxActivite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        fonction: req.body.fonction,
        telephone: req.body.telephone,
        nombreSalarie: req.body.nombreSalarie,
        siteInternet: req.body.siteInternet,
        logoUrl: req.body.logoUrl,
        email: req.body.email,
        password: hash,
      });
      entreprise
        .save()
        .then(() => res.status(201).json({ message: "Entreprise créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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
    res.status(200).json(err);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
