const OffreModel = require('../models/Offre.model');
const EntrepriseModel = require('../models/Entreprise.model');
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

module.exports.readOffreEntreprise = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  OffreModel.find({ offreId: req.params.id }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible d'obtenir: " + err);
  });
};

module.exports.readCandidatStatus = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  OffreModel.find(
    { _id: req.params.id, 'listCandidat.resultat': req.body.resultat },
    (err, docs) => {
      if (!err) res.send(docs.listCandidat);
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
  console.log('*****eto offre*****');
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
    salaireMin: req.body.salaireMin,
    salaireMax: req.body.salaireMax,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    annonceAnonyme: req.body.annonceAnonyme,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
    photoCouverture: req.body.photoCouverture,
    isValidate: req.body.isValidate,
    listCandidat: [],
  });

  try {
    const offre = await newOffre.save();
    return res.status(201).json(offre);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//serait-il possible de modifier un offre sans contacter l'admin? Réponse: seul l'admin peut modifier cet offre
module.exports.updateOffre = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  const updatedOffre = {
    intitulePoste: req.body.intitulePoste,
    localisation: req.body.localisation,
    fonction: req.body.fonction,
    niveauEtude: req.body.niveauEtude,
    typeContrat: req.body.typeContrat,
    typeTravail: req.body.typeTravail,
    dateDebut: req.body.dateDebut,
    delaisRecrutement: req.body.delaisRecrutement,
    expSouhaite: req.body.expSouhaite,
    salaireMin: req.body.salaireMin,
    salaireMax: req.body.salaireMax,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    annonceAnonyme: req.body.annonceAnonyme,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
    photoCouverture: req.body.photoCouverture,
    isValidate: req.body.isValidate,
    listCandidat: [],
  };

  OffreModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedOffre },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
    }
  );
};

module.exports.addCandidat = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu : ' + req.params.id);

  var candidat = {
    candidatId: req.body.candidatId,
    resultat: req.body.resultat,
  };
  OffreModel.findByIdAndUpdate(
    req.params.id,
    { $push: { listCandidat: candidat } },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur de mise à jour de l'offre : " + err);
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
