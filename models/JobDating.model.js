const mongoose = require('mongoose');

const JobDatingSchema = new mongoose.Schema(
  {
    entrepriseId: {
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
    lienConnexion: {
      type: String,
      trim: true,
      maxlenght: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    competencesAttendues: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    savoirIdeal: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    pourquoiPostuler: {
      type: String,
      trim: true,
      maxlenght: 800,
    },
    photoCouverture: {
      type: String,
    },
    lienJobDating: {
      type: String,
    },
    isPublie: {
      type: Boolean,
      default: false,
    },
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

module.exports = mongoose.model('JobDating', JobDatingSchema);
