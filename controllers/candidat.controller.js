const Candidat = require('../models/Candidat.model');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const { s3Uploadv2 } = require('../s3service');
const fs = require('fs');

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
    res.status(201).send(candidat);
    const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.CLIENT_URL}/api/user/candidat/verification/${candidat._id}`;
    await sendEmail(candidat.email, 'Confirmation email', url);
  } catch (err) {
    const errors = signUperrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.singIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const candidat = await Candidat.login(email, password);
    if (candidat.isVerified === false) {
      const url = `Pour confirmer votre inscription à la plateforme Skill Of The World, veuillez cliquer sur ce lien ${process.env.CLIENT_URL}/api/user/candidat/verification/${candidat._id} et suivre les instructions.`;
      await sendEmail(candidat.email, 'Confirmation email', url);
      res.status(201).send('Un email a été envoyé  veuiller vérifier');
    } else {
      // create a token
      const token = createToken(candidat._id);
      res.cookie('candidat', token, { httpOnly: true, maxAge }); //token consultable uniquement par le serveur
      res.status(200).json({ candidat: candidat._id });
    }
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('candidat', '', { maxAge: 1 });
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
module.exports.addCV = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const file = req.file;
  const result = await s3Uploadv2(req.params.id, file);
  const uploadLogo = `uploads/${req.params.id}-${req.file.originalname}`;

  var myCV = {
    file1_path: uploadLogo,
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
// suppression de cv  au candidat
module.exports.deleteCV = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Candidat.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        listCV: {
          _id: req.params.idcv,
        },
      },
    },
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

// ajout de lm au candidat
module.exports.addLM = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const file = req.file;
  const result = await s3Uploadv2(req.params.id, file);
  const uploadLogo = `uploads/${req.params.id}-${req.file.originalname}`;

  var myLM = {
    file1_path: uploadLogo,
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
// suppression de lm  au candidat
module.exports.deleteLM = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  Candidat.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        listLM: {
          _id: req.params.idlm,
        },
      },
    },
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
  if (req.file) {
    // save to Bucket AWS S3
    const file = req.file;
    const result = await s3Uploadv2(req.params.id, file);
    const uploadLogo = `uploads/${req.params.id}-${req.file.originalname}`;
    const candidat = await Candidat.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        uploadLogo,
      }
    );
    res.status(200).send(candidat);
  } else {
    const candidat = await Candidat.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).send(candidat);
  }
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

module.exports.loggedInCandidat = async (req, res) => {
  try {
    const token = req.cookies.candidat;
    if (!token) return res.json(false);
    res.send(jwt.verify(token, process.env.TOKEN_SECRET));
  } catch (err) {
    res.json(false);
  }
};

// delete a candidat
module.exports.deleteCandidat = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le candidat n'existe pas" });
  }

  const candidat = await Candidat.findOneAndDelete({ _id: id });

  if (!candidat) {
    return res.status(400).json({ error: "Le candidat n'existe pas" });
  }

  res.status(200).json(candidat);
};
