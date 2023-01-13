const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

function adminMiddleware(req, res, next) {
  try {
    const token = req.cookies.admin;
    if (!token)
      return res.status(401).json({ errorMessage: "Vous n'êtes pas autorisé" });
    const verified = jwt.verify(token, process.env.SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Vous n'êtes pas autorisé" });
  }
}

module.exports = adminMiddleware;

// module.exports.checkAdmin = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.admin = null;
//         res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         let admin = await Admin.findById(decodedToken.id);
//         res.locals.admin = admin;
//         next();
//       }
//     });
//   } else {
//     res.locals.admin = null;
//     next();
//   }
// };

// //contrôle de token
// module.exports.requireAuthAdmin = (req, res, next) => {
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
