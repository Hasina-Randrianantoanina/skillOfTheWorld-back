const jwt = require("jsonwebtoken");
const Candidat = require("../models/Candidat.model");

module.exports.checkCandidat = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let candidat = await Candidat.findById(decodedToken.id);
        res.locals.candidat = candidat;
        next();
      }
    });
  } else {
    res.locals.candidat = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Pas de token");
  }
};
