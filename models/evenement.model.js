const mongoose = require('mongoose');

const evenementSchema = mongoose.Schema(
  {
    idEntreprise: { type: String },
    nomEntreprise: { type: String, required: true },
    theme: { type: String, required: true },
    typeEvenement: { type: String, required: true },
    personneContacter: { type: String, required: true },
    dateEvenement: { type: String, required: true },
    horaireSouhaite: { type: String, required: true },
    modePayement: { type: String },
    photoCouverture: { type: String },
    lienEvenement: { type: String },
    isPublie: { type: Boolean, default: false },
    listCandidat: [
      {
        candidatId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Evenement', evenementSchema);
