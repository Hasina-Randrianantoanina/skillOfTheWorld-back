const jwt = require('jsonwebtoken');
const Candidat = require('../models/Candidat.model');

function candidatMiddleware(req, res, next) {
  try {
    const token = req.cookies.candidat;
    if (!token)
      return res.status(401).json({ errorMessage: "Vous n'êtes pas autorisé" });
    const verified = jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Vous n'êtes pas autorisé" });
  }
}

module.exports = candidatMiddleware;

// module.exports.checkCandidat = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.candidat = null;
//         res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         let candidat = await Candidat.findById(decodedToken.id);
//         res.locals.candidat = candidat;
//         next();
//       }
//     });
//   } else {
//     res.locals.candidat = null;
//     next();
//   }
// };

// //contrôle de token
// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("Pas de token!");
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("Pas de token!");
//   }
// };
