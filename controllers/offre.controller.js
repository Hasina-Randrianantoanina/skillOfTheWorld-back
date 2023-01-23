const OffreModel = require('../models/Offre.model');
const sendEmail = require('../utils/sendEmail');
const receiveEmail = require('../utils/receiveEmail');
const { s3Uploadv2 } = require('../s3service');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readOffre = (req, res) => {
  OffreModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur d'obtention de données: " + err);
  });
};

module.exports.readOffreValide = async (req, res) => {
  const offre = await OffreModel.find({ isValidate: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(offre);
};

module.exports.readOffreNonValide = async (req, res) => {
  const offre = await OffreModel.find({ isValidate: false });
  res.status(200).json(offre);
};
module.exports.readOffreDepublie = async (req, res) => {
  const offre = await OffreModel.find({ depublie: true });
  res.status(200).json(offre);
};

module.exports.readOffreEntreprise = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  OffreModel.find({ offreId: req.params.id }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

module.exports.readOffreCandidatPostule = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);
  OffreModel.find({ 'listCandidat.candidatId': req.params.id }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

module.exports.checkCandidat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);
  OffreModel.find(
    {
      _id: req.params.id,
      'listCandidat.candidatId': { $in: req.params.idCandidat },
    },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Impossible d'obtenir: " + err);
    }
  );
};

module.exports.readCandidatStatus = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  OffreModel.find(
    { _id: req.params.id, 'listCandidat.resultat': req.body.resultat },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Impossible d'obtenir: " + err);
    }
  );
};

module.exports.readOneOffre = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  OffreModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

module.exports.createOffre = async (req, res) => {
  // save to Bucket AWS S3
  const file = req.file;
  const result = await s3Uploadv2(req.body.offreId, file);
  const uploadCouverture = `uploads/${req.body.offreId}-${req.file.originalname}`;
  const newOffre = new OffreModel({
    offreId: req.body.offreId,
    intitulePoste: req.body.intitulePoste,
    localisation: req.body.localisation,
    fonction: req.body.fonction,
    niveauEtude: req.body.niveauEtude,
    typeContrat: req.body.typeContrat,
    typeTravail: req.body.typeTravail,
    dateDebut: req.body.dateDebut,
    delaisRecrutement: req.body.delaisRecrutement,
    expSouhaite: req.body.expSouhaite,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    groupe: req.body.groupe,
    annonceAnonyme: req.body.annonceAnonyme,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
    uploadCouverture: uploadCouverture,
    modePaiement: req.body.modePaiement,
    listCandidat: [],
  });

  try {
    if (req.body.souhaitAccompagnement === true) {
      await receiveEmail(
        "Demande d'accompagnement total de recrutement",
        `${req.body.nomEntreprise} ,${req.body.email} demande accompagnement total de recrutement`
      );
    }
    await receiveEmail(
      `Nouvelle offre d'emploi en attente`,
      `Bonjour,
    Une nouvelle offre ${req.body.intitulePoste} est en attente de validation. 
    Cliquez sur ce lien pour consulter les offres en attente ${process.env.CLIENT_URL}/validationOffre `
    );
    const offre = await newOffre.save();
    return res.status(201).send(offre);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.createOffreWithutfile = async (req, res) => {
  const newOffre = new OffreModel({
    offreId: req.body.offreId,
    intitulePoste: req.body.intitulePoste,
    localisation: req.body.localisation,
    fonction: req.body.fonction,
    niveauEtude: req.body.niveauEtude,
    typeContrat: req.body.typeContrat,
    typeTravail: req.body.typeTravail,
    dateDebut: req.body.dateDebut,
    delaisRecrutement: req.body.delaisRecrutement,
    expSouhaite: req.body.expSouhaite,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    groupe: req.body.groupe,
    annonceAnonyme: req.body.annonceAnonyme,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
    modePaiement: req.body.modePaiement,
    listCandidat: [],
  });

  try {
    const offre = await newOffre.save();
    if (req.body.souhaitAccompagnement === true) {
      const message = `${req.body.nomEntreprise} ,${req.body.email} demande accompagnement total de recrutement`;
      await receiveEmail(
        "Demande d'accompagnement total de recrutement",
        message
      );
    }
    await receiveEmail(
      `Nouvelle offre d'emploi en attente`,
      `Bonjour,
    Une nouvelle offre ${req.body.intitulePoste} est en attente de validation. 
    Cliquez sur ce lien pour consulter les offres en attente ${process.env.CLIENT_URL}/validationOffre `
    );
    return res.status(201).send(offre);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateOffre = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  if (req.file) {
    // save to Bucket AWS S3
    const file = req.file;
    const result = await s3Uploadv2(req.params.id, file);

    // save to mongodb cloud
    // const uploadCouverture = req.file.path;
    const uploadCouverture = `uploads/${req.params.id}-${req.file.originalname}`;
    const offre = await OffreModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        uploadCouverture,
      }
    );
    if (!offre) {
      return res
        .status(400)
        .json({ error: "L'offre n'existe pas", resultat: result });
    }
    res.status(200).send(offre);
  } else {
    const offre = await OffreModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (!offre) {
      return res.status(400).json({ error: "L'offre n'existe pas" });
    }
    res.status(200).send(offre);
  }
};

module.exports.addCandidat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const cv = req.files['file1'][0];
  const lm = req.files['file2'][0];
  const sendcv = await s3Uploadv2(req.params.id, cv);
  const sendlm = await s3Uploadv2(req.params.id, lm);

  const cvfile = `uploads/${req.params.id}-${cv.originalname}`;
  const lmfile = `uploads/${req.params.id}-${lm.originalname}`;

  const candidat = {
    candidatId: req.body.candidatId,
    resultat: req.body.resultat,
    file1_path: cvfile,
    file1_mimetype: cv.mimetype,
    file2_path: lmfile,
    file2_mimetype: lm.mimetype,
  };

  OffreModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listCandidat: candidat } },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.addCandidatTheque = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);
  const candidat = {
    candidatId: req.body.candidatId,
    resultat: req.body.resultat,
    file1_path: req.body.cvtheque,
    file2_path: req.body.lmtheque,
  };

  OffreModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listCandidat: candidat } },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.addCandidatCV = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const file = req.file;
  const result = await s3Uploadv2(req.params.id, file);
  const cvfile = `uploads/${req.params.id}-${req.file.originalname}`;

  const candidat = {
    candidatId: req.body.candidatId,
    resultat: req.body.resultat,
    file1_path: cvfile,
    file1_mimetype: file.mimetype,
  };

  OffreModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listCandidat: candidat } },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.addCandidatCVTheque = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const candidat = {
    candidatId: req.body.candidatId,
    resultat: req.body.resultat,
    file1_path: req.body.cvtheque,
  };

  OffreModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { listCandidat: candidat } },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};
module.exports.repondreCandidat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  OffreModel.findOneAndUpdate(
    { _id: req.params.id, 'listCandidat.candidatId': req.body.candidatId },
    {
      $set: { 'listCandidat.$.resultat': req.body.resultat },
    },
    { new: true },
    (err, docs) => {
      if (!err) {
        sendEmail(
          req.body.email,
          'Suite à votre candidature sur la plateforme Skill Of The World',
          req.body.texte
        );
        res.send(docs);
      } else {
        console.log("Erreur de mise à jour de l'offre : " + err);
      }
    }
  );
};

module.exports.valideCV = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  // if(req.body.isValideCV === false){

  // }

  OffreModel.findOneAndUpdate(
    { _id: req.params.id, 'listCandidat.candidatId': req.body.candidatId },
    {
      $set: { 'listCandidat.$.isValideCV': req.body.isValideCV },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.valideLM = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  OffreModel.findOneAndUpdate(
    { _id: req.params.id, 'listCandidat.candidatId': req.body.candidatId },
    {
      $set: { 'listCandidat.$.isValideLM': req.body.isValideLM },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.deleteOffre = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  OffreModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible de supprimer l'offre: " + err);
  });
};
