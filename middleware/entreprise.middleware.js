const jwt = require("jsonwebtoken");
const Entreprise = require("../models/Entreprise.model");

module.exports.checkEntreprise = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.entreprise = null;
        res.cookie("jwt", "", { maxAge: 1 });
      } else {
        let entreprise = await Entreprise.findById(decodedToken.id);
        res.locals.entreprise = entreprise;
        next();
      }
    });
  } else {
    res.locals.entreprise = null;
    next();
  }
};

module.exports.requireAuthEntreprise = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("Pas de token!");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Pas de token!");
  }
};
