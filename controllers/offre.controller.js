const OffreModel = require("../models/Offre.model");
const EntrepriseModel = require("../models/Entreprise.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readOffre = (req, res) => {
  OffreModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur d'obtention de données: " + err);
  });
};

module.exports.createOffre = async (req, res) => {
  console.log("*****eto offre*****");
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
    experienceSouhaite: req.body.experienceSouhaite,
    fourchetteRemuneration: req.body.fourchetteRemuneration,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    annonceAnonyme: req.body.annonceAnonyme,
    preSelectionCV: req.body.preSelectionCV,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
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
    return res.status(400).send("ID inconnu : " + req.params.id);

  const updatedOffre = {
    intitulePoste: req.body.intitulePoste,
    localisation: req.body.localisation,
    fonction: req.body.fonction,
    niveauEtude: req.body.niveauEtude,
    typeContrat: req.body.typeContrat,
    typeTravail: req.body.typeTravail,
    dateDebut: req.body.dateDebut,
    delaisRecrutement: req.body.delaisRecrutement,
    experienceSouhaite: req.body.experienceSouhaite,
    fourchetteRemuneration: req.body.fourchetteRemuneration,
    siteWeb: req.body.siteWeb,
    destinataire: req.body.destinataire,
    annonceAnonyme: req.body.annonceAnonyme,
    preSelectionCV: req.body.preSelectionCV,
    souhaitAccompagnement: req.body.souhaitAccompagnement,
    savoirIdeal: req.body.savoirIdeal,
    competencesAttendues: req.body.competencesAttendues,
    descriptionOffre: req.body.descriptionOffre,
    pourquoiPostuler: req.body.pourquoiPostuler,
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

module.exports.deleteOffre = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  OffreModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Impossible de supprimer l'offre: " + err);
  });
};
