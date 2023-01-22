const JobDating = require('../models/JobDating.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const receiveMailFile = require('../utils/receiveMailFile');
const receiveCVLM = require('../utils/receiveCVLM');
const sendMail = require('../utils/sendEmail');
const { s3Uploadv2 } = require('../s3service');

// get all job dating publie
module.exports.getJobDatingValide = async (req, res) => {
  const jobDating = await JobDating.find({ isPublie: true }).sort({
    createdAt: -1,
  });
  res.status(200).send(jobDating);
};

// get all job dating not publie
module.exports.getJobDatingNonValide = async (req, res) => {
  const jobDating = await JobDating.find({ isPublie: false }).sort({
    createdAt: -1,
  });

  res.status(200).send(jobDating);
};

//get all job dating for entreprise
module.exports.getJobDAtingEntreprise = async (req, res) => {
  const jobDating = await JobDating.find({ entrepriseId: req.params.id }).sort({
    createdAt: -1,
  });
  res.status(200).send(jobDating);
};
// get a single job dating
module.exports.getOneJobDating = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Le job dating  n'existe pas" });
  }
  const jobDating = await JobDating.findById(id);

  if (!jobDating) {
    return res.status(404).json({ error: "Le job dating n'existe pas" });
  }
  res.status(200).send(jobDating);
};

// create a new job dating
module.exports.createJobDating = async (req, res) => {
  if (req.file) {
    const file = req.file;
    const result = await s3Uploadv2(req.body.entrepriseId, file);
    const photoCouverture = `uploads/${req.body.entrepriseId}-${req.file.originalname}`;
    const {
      entrepriseId,
      intitulePoste,
      localisation,
      fonction,
      niveauEtude,
      typeContrat,
      typeTravail,
      dateDebut,
      delaisRecrutement,
      expSouhaite,
      siteWeb,
      lienConnexion,
      description,
      competencesAttendues,
      savoirIdeal,
      pourquoiPostuler,
      lienJobDating,
      modePaiement,
      isPublie,
    } = req.body;
    try {
      const jobDating = await JobDating.create({
        entrepriseId,
        intitulePoste,
        localisation,
        fonction,
        niveauEtude,
        typeContrat,
        typeTravail,
        dateDebut,
        delaisRecrutement,
        expSouhaite,
        siteWeb,
        lienConnexion,
        description,
        competencesAttendues,
        savoirIdeal,
        photoCouverture,
        modePaiement,
        pourquoiPostuler,
        lienJobDating,
        isPublie,
      });
      res.status(200).send(jobDating);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const {
      entrepriseId,
      intitulePoste,
      localisation,
      fonction,
      niveauEtude,
      typeContrat,
      typeTravail,
      dateDebut,
      delaisRecrutement,
      expSouhaite,
      siteWeb,
      lienConnexion,
      description,
      modePaiement,
      competencesAttendues,
      savoirIdeal,
      pourquoiPostuler,
      lienJobDating,
      isPublie,
    } = req.body;
    try {
      const jobDating = await JobDating.create({
        entrepriseId,
        intitulePoste,
        localisation,
        fonction,
        niveauEtude,
        typeContrat,
        typeTravail,
        dateDebut,
        delaisRecrutement,
        expSouhaite,
        siteWeb,
        modePaiement,
        lienConnexion,
        description,
        competencesAttendues,
        savoirIdeal,
        pourquoiPostuler,
        lienJobDating,
        isPublie,
      });
      res.status(200).send(jobDating);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// update job Dating
module.exports.updateJobDating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }
  if (req.file) {
    const file = req.file;
    const result = await s3Uploadv2(id, file);
    const photoCouverture = `uploads/${id}-${req.file.originalname}`;

    const jobDating = await JobDating.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        photoCouverture,
      }
    );

    if (!jobDating) {
      return res.status(400).json({ error: "Le job dating n'existe pas" });
    }

    res.status(200).send(jobDating);
  } else {
    const jobDating = await JobDating.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!jobDating) {
      return res.status(400).json({ error: "Le job dating n'existe pas" });
    }

    res.status(200).send(jobDating);
  }
};

// delete a job dating
module.exports.deleteJobDating = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }

  const jobDating = await JobDating.findOneAndDelete({ _id: id });

  if (!jobDating) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }

  res.status(200).json(jobDating);
};

module.exports.ajoutCandidat = async (req, res) => {
  const { id } = req.params;
  const objet = `Demande participation candidat à un job dating ${req.body.intitulePoste}`;
  const message = req.body.prenom
    ? `${req.body.nom} ${req.body.prenom} a demandé à participer au job dating`
    : `${req.body.nom} a demandé à participer au job dating`;

  const object = `Votre demande de participation au job dating ${req.body.intitulePoste}`;
  const texte = `Bonjour, Nous avons bien pris en compte votre demande de participation pour le job dating ${req.body.intitulePoste}. Si votre candidature est retenue, vous serez contacté et nous vous donnerons toutes les informations de connexion.`;
  const candidat = {
    candidatId: req.body.candidatId,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }
  if (req.file) {
    try {
      await JobDating.findByIdAndUpdate(
        { _id: id },
        { $push: { listCandidat: candidat } },
        { new: true }
      );
      await receiveMailFile(objet, message, req.file.path);
      await sendMail(req.body.email, object, texte);
      res.status(200).send('Postulation avec succès');
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await JobDating.findByIdAndUpdate(
        { _id: id },
        { $push: { listCandidat: candidat } },
        { new: true }
      );
      await receiveMailFile(objet, message, req.body.cv);
      await sendMail(req.body.email, object, texte);
      res.status(200).send('Postulation avec succès');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.ajoutCandidaCVLM = async (req, res) => {
  const { id } = req.params;
  const objet = `Demande participation candidat à un job dating ${req.body.intitulePoste}`;
  const message = req.body.prenom
    ? `${req.body.nom} ${req.body.prenom} a demandé à participer au job dating`
    : `${req.body.nom} a demandé à participer au job dating`;

  const object = `Votre demande de participation au job dating ${req.body.intitulePoste}`;
  const texte = `Bonjour, Nous avons bien pris en compte votre demande de participation pour le job dating ${req.body.intitulePoste}. Si votre candidature est retenue, vous serez contacté et nous vous donnerons toutes les informations de connexion.`;

  const candidat = {
    candidatId: req.body.candidatId,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }
  if (req.body.lm) {
    try {
      await JobDating.findByIdAndUpdate(
        { _id: id },
        { $push: { listCandidat: candidat } },
        { new: true }
      );
      await receiveCVLM(objet, message, req.body.cv, req.body.lm);
      await sendMail(req.body.email, object, texte);
      res.status(200).send('Postulation avec succès');
    } catch (error) {
      console.log(error);
    }
  } else if (req.files) {
    try {
      await JobDating.findByIdAndUpdate(
        { _id: id },
        { $push: { listCandidat: candidat } },
        { new: true }
      );
      if (req.files) {
      }
      await receiveCVLM(
        objet,
        message,
        req.files['cv'][0].path,
        req.files['lm'][0].path
      );
      await sendMail(req.body.email, object, texte);
      res.status(200).send('Postulation avec succès');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.checkCandidat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  const verification = await JobDating.find({
    _id: req.params.id,
    'listCandidat.candidatId': { $in: [req.params.idCandidat] },
  });
  if (verification.length > 0) {
    res.status(201).send('Vous avez déjà fait votre demande de participation');
  } else {
    res.status(200).send("Vous n'êtes pas encore inscrit");
  }
};

module.exports.checkCandidat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  const verification = await JobDating.find({
    _id: req.params.id,
    'listCandidat.candidatId': { $in: [req.params.idCandidat] },
  });
  if (verification.length > 0) {
    res.status(201).send('Vous avez déjà fait votre demande de participation');
  } else {
    res.status(200).send("Vous n'êtes pas encore inscrit");
  }
};
