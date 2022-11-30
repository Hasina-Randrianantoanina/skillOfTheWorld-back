const JobDating = require('../models/JobDating.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

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
    const photoCouverture = req.file.path;
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
};
// update job Dating with image
module.exports.updateJobDatingImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }

  const jobDating = await JobDating.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
      photoCouverture: req.file.path,
    }
  );

  if (!jobDating) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }

  res.status(200).send(jobDating);
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
