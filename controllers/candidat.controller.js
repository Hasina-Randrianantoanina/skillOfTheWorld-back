const Candidat = require('../models/Candidat.model');
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
    nom,
    prenom,
    dateNaissance,
    localisation,
    email,
    uploadLogo,
    isVerified,
    password,
    listLM,
    listCV,
  } = req.body;

  try {
    const candidat = await Candidat.create({
      nom,
      prenom,
      dateNaissance,
      localisation,
      email,
      uploadLogo,
      isVerified,
      password,
      listLM,
      listCV,
    });
    const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.BASE_URL}/api/user/candidat/verification/${candidat._id}`;
    await sendEmail(candidat.email, 'Confirmation email', url);
    res
      .status(201)
      .send('Un email a été envoyé vers votre compte veuiller vérifier');
    // res.status(201).json({ candidat: candidat._id });
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  console.log('eto ****');
  const { email, password } = req.body;

  try {
    const candidat = await Candidat.login(email, password);
    if (candidat.isVerified === false) {
      const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.BASE_URL}/api/user/candidat/verification/${candidat._id} et suivre les instructions.`;
      await sendEmail(candidat.email, 'Confirmation email', url);
      res.send('Un email a été envoyé  veuiller vérifier');
    } else {
      // create a token
      const token = createToken(candidat._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
      res.status(200).json({ candidat: candidat._id });
    }
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

// get one candidat
module.exports.readOneCandidat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Candidat.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

// candidat add CV
module.exports.addCV = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  var myCV = {
    file1_path: req.file.path,
    file1_mimetype: req.file.mimetype,
  };
  Candidat.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listCV: myCV } },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

// verification email de candidat
module.exports.verificationCandidat = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const candidat = await Candidat.findById(id);

  if (!candidat) {
    return res.status(404).json({ error: 'Votre id est invalide' });
  }

  await Candidat.updateOne({ _id: id }, { isVerified: true });
  res.status(200).send('Votre email est vérifié');
};

// ajout de cv au candidat
module.exports.addLM = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  var myLM = {
    file1_path: req.file.path,
    file1_mimetype: req.file.mimetype,
  };

  Candidat.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listLM: myLM } },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

// update a candidat with file
module.exports.updateCandidat = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const candidat = await Candidat.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      uploadLogo: req.file.path,
    }
  );

  if (!candidat) {
    return res.status(400).json({ error: "Votre id n'existe pas" });
  }

  res.status(200).send(candidat);
};

// update candidat without file
module.exports.updateCandidatAction = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const candidat = await Candidat.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!candidat) {
    return res.status(400).json({ error: "Votre id n'existe pas" });
  }

  res.status(200).send(candidat);
};
//update a password
module.exports.updatePassword = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  const { email, password, newPassword } = req.body;
  const salt = await bcrypt.genSalt();
  newpassword = await bcrypt.hash(newPassword, salt);
  try {
    const candidat = await Candidat.login(email, password);
    const auth = await bcrypt.compare(password, candidat.password);
    if (auth) {
      Candidat.findOneAndUpdate(
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
//update a password by email
module.exports.updatePasswordEmail = async (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  newpassword = await bcrypt.hash(password, salt);
  // console.log(newpassword);
  try {
    Candidat.findOneAndUpdate(
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

// read all candidat
module.exports.readAllCandidat = (req, res) => {
  Candidat.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur d'obtention de données: " + err);
  });
};

module.exports.checkMailCandidat = (req, res) => {
  Candidat.find({ email: { $in: [req.params.email] } }, async (err, docs) => {
    if (!err) {
      const url = `Pour changer votre mot de passe , veuillez cliquez sur ce lien ${process.env.CLIENT_URL}/resetPasswordCandidat/${docs[0]._id}/ et suivre les instructions.`;
      await sendEmail(req.params.email, 'Changement de mot de passe', url);
      res.send(docs);
    } else console.log("Impossible d'obtenir: " + err);
  });
};
