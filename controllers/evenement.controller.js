const Evenement = require('../models/evenement.model');
const mongoose = require('mongoose');
const sendMail = require('../utils/sendEmail');
const receiveMail = require('../utils/receiveEmail');
const ObjectID = require('mongoose').Types.ObjectId;

// get all evenement publie
module.exports.getEvenementValide = async (req, res) => {
  const evenement = await Evenement.find({ isPublie: true }).sort({
    createdAt: -1,
  });

  res.status(200).send(evenement);
};

// get all evenement not publie
module.exports.getEvenementNonValide = async (req, res) => {
  const evenement = await Evenement.find({ isPublie: false }).sort({
    createdAt: -1,
  });

  res.status(200).send(evenement);
};

// get all evenement for entreprise
module.exports.getEvenementsEntreprise = async (req, res) => {
  const evenement = await Evenement.find({ idEntreprise: req.params.id }).sort({
    createdAt: -1,
  });

  res.status(200).send(evenement);
};

// get a single evenement
module.exports.getEvenement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "L'evenement n'existe pas" });
  }

  const evenement = await Evenement.findById(id);

  if (!evenement) {
    return res.status(404).json({ error: "L'evenement n'existe pas" });
  }

  res.status(200).send(evenement);
};

// create a new evenement
module.exports.createEvenement = async (req, res) => {
  if (req.file) {
    const photoCouverture = req.file.path;
    const {
      idEntreprise,
      nomEntreprise,
      theme,
      typeEvenement,
      personneContacter,
      dateEvenement,
      modePayement,
      horaireSouhaite,
      lienEvenement,
      isPublie,
    } = req.body;
    try {
      const evenement = await Evenement.create({
        idEntreprise,
        nomEntreprise,
        theme,
        typeEvenement,
        personneContacter,
        modePayement,
        dateEvenement,
        horaireSouhaite,
        photoCouverture,
        lienEvenement,
        isPublie,
      });
      res.status(200).send(evenement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const {
      idEntreprise,
      nomEntreprise,
      theme,
      personneContacter,
      typeEvenement,
      dateEvenement,
      modePayement,
      horaireSouhaite,
      lienEvenement,
      isPublie,
    } = req.body;
    try {
      const evenement = await Evenement.create({
        idEntreprise,
        nomEntreprise,
        theme,
        typeEvenement,
        personneContacter,
        dateEvenement,
        modePayement,
        horaireSouhaite,
        lienEvenement,
        isPublie,
      });
      res.status(200).send(evenement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// delete a evenement
module.exports.deleteEvenement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "L'evenement n'existe pas" });
  }

  const evenement = await Evenement.findOneAndDelete({ _id: id });

  if (!evenement) {
    return res.status(400).json({ error: "L'evenement n'existe pas" });
  }

  res.status(200).json(evenement);
};

// update a evenement
module.exports.updateEvenement = async (req, res) => {
  const { id } = req.params;
  const photoCouverture = req.file.path;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "L'evenement n'existe pas" });
  }
  if (req.file) {
    const evenement = await Evenement.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        photoCouverture,
      }
    );
    if (!evenement) {
      return res.status(400).json({ error: "L'evenement n'existe pas" });
    }
    res.status(200).send(evenement);
  } else {
    const evenement = await Evenement.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!evenement) {
      return res.status(400).json({ error: "L'evenement n'existe pas" });
    }
    res.status(200).send(evenement);
  }
};

module.exports.ajoutCandidat = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Le job dating n'existe pas" });
  }
  const objet = `Demande participation candidat à un évènement privé ${req.body.theme}`;
  const message = req.body.prenom
    ? `${req.body.nom} ${req.body.prenom} a demandé à participer à l'évènement en ligne privé`
    : `${req.body.nom} a demandé à participer à l'évènement en ligne privé`;
  const object = `Votre demande de participation à l'évènement ${req.body.theme}`;
  const texte = `Bonjour, Nous avons bien pris en compte votre demande de participation pour l'évènement ${req.body.theme}. Si votre demande est acceptée, vous serez contactez.`;

  const candidat = {
    candidatId: req.body.candidatId,
  };
  try {
    await Evenement.findByIdAndUpdate(
      { _id: id },
      { $push: { listCandidat: candidat } },
      { new: true }
    );
    await receiveMail(objet, message);
    await sendMail(req.body.email, object, texte);
    res.status(200).send('Postulation avec succès');
  } catch (error) {
    console.log(error);
  }
};

module.exports.checkCandidat = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID teste : ' + req.params.id);

  const verification = await Evenement.find({
    _id: req.params.id,
    'listCandidat.candidatId': { $in: [req.params.idCandidat] },
  });
  if (verification.length > 0) {
    res.status(201).send('Vous avez déjà fait votre demande de participation');
  } else {
    res.status(200).send("Vous n'êtes pas encore inscrit");
  }
};
