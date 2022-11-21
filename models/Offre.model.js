const mongoose = require('mongoose');

const OffreSchema = new mongoose.Schema(
  {
    offreId: {
      type: String,
      require: true,
    },
    intitulePoste: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    localisation: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    fonction: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    niveauEtude: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    typeContrat: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    typeTravail: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    dateDebut: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    delaisRecrutement: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    expSouhaite: {
      type: String,
      trim: true,
      maxlenght: 30,
    },
    siteWeb: {
      type: String,
      trim: true,
      maxlenght: 100,
    },
    destinataire: {
      type: String,
      trim: true,
      maxlenght: 100,
    },
    annonceAnonyme: {
      type: Boolean,
      require: true,
    },

    souhaitAccompagnement: {
      type: Boolean,
      require: true,
    },
    savoirIdeal: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    competencesAttendues: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    descriptionOffre: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    pourquoiPostuler: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    uploadCouverture: {
      type: String,
      require: true,
    },
    isValidate: {
      type: Boolean,
      default: false,
    },
    modePaiement: {
      type: String,
    },
    listCandidat: [
      {
        date: { type: Date, default: Date.now },
        candidatId: {
          type: String,
        },
        resultat: {
          type: String,
        },
        file1_path: {
          type: String,
        },
        file1_mimetype: {
          type: String,
        },
        file2_path: {
          type: String,
        },
        file2_mimetype: {
          type: String,
        },
        isValideCV: {
          type: Boolean,
        },
        isValideLM: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Offre', OffreSchema);
