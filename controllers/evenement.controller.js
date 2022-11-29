const Evenement = require('../models/evenement.model');
const mongoose = require('mongoose');

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
      personneContacter,
      dateEvenement,
      horaireSouhaite,
      lienEvenement,
      isPublie,
    } = req.body;
    try {
      const evenement = await Evenement.create({
        idEntreprise,
        nomEntreprise,
        theme,
        personneContacter,
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
      dateEvenement,
      horaireSouhaite,
      lienEvenement,
      isPublie,
    } = req.body;
    try {
      const evenement = await Evenement.create({
        idEntreprise,
        nomEntreprise,
        theme,
        personneContacter,
        dateEvenement,
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "L'evenement n'existe pas" });
  }

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
};
