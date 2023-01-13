const Admin = require('../models/Admin.model');
const jwt = require('jsonwebtoken');

const { signUperrors, signInErrors } = require('../utils/error.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000; // token valide pendant 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  //console.log("manao inscription admin");
  const { nom, prenom, email, password } = req.body;

  try {
    const admin = await Admin.create({
      nom,
      prenom,
      email,
      password,
    });
    res.status(201).json({ admin: admin._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  console.log("admin s'authentifie ****");
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie('admin', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
    res.status(200).json({ admin: admin._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('admin', '', { maxAge: 1 });
  res.redirect('/');
};
module.exports.loggedInAdmin = async (req, res) => {
  try {
    const token = req.cookies.admin;
    if (!token) return res.json(false);
    res.send(jwt.verify(token, process.env.TOKEN_SECRET));
  } catch (err) {
    res.json(false);
  }
};
