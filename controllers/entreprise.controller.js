const Entreprise = require('../models/Entreprise.model');
const sendEmail = require('../utils/sendEmail');
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
    isVerified,
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
      isVerified,
      uploadLogo,
      password,
    });
    // res.status(201).json({ entreprise: entreprise._id });
    res.status(201).send(entreprise);
    const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.BASE_URL}/api/user/entreprise/verification/${entreprise._id} et suivre les instructions. `;
    await sendEmail(entreprise.email, 'Verification email', url);
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

    if (entreprise.isVerified === false) {
      const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.BASE_URL}/api/user/entreprise/verification/${entreprise._id} et suivre les instructions.`;
      await sendEmail(entreprise.email, 'Verification email', url);
      res.send('Un email a été envoyé  veuiller vérifier');
    } else {
      // create a token
      const token = createToken(entreprise._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
      res.status(200).send({ entreprise: entreprise._id });
    }
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// get one entreprise
module.exports.readOneEntreprise = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Entreprise.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

// update entreprise
module.exports.updatEntreprise = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const entreprise = await Entreprise.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      photoCouverture: req.file.path,
    }
  );

  if (!entreprise) {
    return res.status(400).json({ error: "Votre id n'existe pas" });
  }

  res.status(200).send(entreprise);
};

// verification email d'entreprise
module.exports.verificationEntreprise = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const entreprise = await Entreprise.findById(id);

  if (!entreprise) {
    return res.status(404).json({ error: 'Votre id est invalide' });
  }

  await Entreprise.updateOne({ _id: id }, { isVerified: true });
  res.status(200).send('Votre email est vérifié');
};

module.exports.updatePassword = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  const { email, password, newPassword } = req.body;
  const salt = await bcrypt.genSalt();
  newpassword = await bcrypt.hash(newPassword, salt);

  try {
    const entreprise = await Entreprise.login(email, password);
    const auth = await bcrypt.compare(password, entreprise.password);
    if (auth) {
      Entreprise.findOneAndUpdate(
        { _id: id },
        {
          $set: { password: newpassword },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Erreur de mise à jour de l'offre : " + err);
        }
      );
    } else {
    }
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};
// read all entreprise
module.exports.readAllEntreprise = (req, res) => {
  Entreprise.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur d'obtention de données: " + err);
  });
};

//update a password
module.exports.updatePasswordEmail = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  newpassword = await bcrypt.hash(password, salt);
  // console.log(newpassword);
  try {
    Entreprise.findOneAndUpdate(
      { _id: id },
      {
        $set: { password: newpassword },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Erreur de mise à jour de l'offre : " + err);
      }
    );
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.checkMailEntreprise = (req, res) => {
  Entreprise.find({ email: { $in: [req.params.email] } }, async (err, docs) => {
    if (!err) {
      const url = `Pour changer votre mot de passe , veuillez cliquez sur ce lien ${process.env.CLIENT_URL}/resetPasswordEntreprise/${docs[0]._id}/ et suivre les instructions.`;
      await sendEmail(req.params.email, 'Changement de mot de passe', url);
      res.send(docs);
    } else console.log("Impossible d'obtenir: " + err);
  });
};
