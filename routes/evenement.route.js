const express = require('express');
const evenementRoute = require('../controllers/evenement.controller');
const upload = require('../middleware/upload.image');

const router = express.Router();

// GET all evenement publie
router.get('/publie', evenementRoute.getEvenementValide);

// GET all evenement publie
router.get('/notpublie', evenementRoute.getEvenementNonValide);

// GET all evenement from entreprise
router.get('/entreprise/:id', evenementRoute.getEvenementsEntreprise);

// GET a single evenement
router.get('/:id', evenementRoute.getEvenement);

//verification si le candidat a déjà fait sa demande de participation
router.get(
  '/verification/:id/candidat/:idCandidat',
  evenementRoute.checkCandidat
);

// POST a new evenement
router.post(
  '/',
  upload.single('photoCouverture'),
  evenementRoute.createEvenement
);

// DELETE a evenement
router.delete('/:id', evenementRoute.deleteEvenement);

// UPDATE a evenement
router.patch('/:id', evenementRoute.updateEvenement);
// participation des candidats
router.patch('/postule/:id', evenementRoute.ajoutCandidat);

module.exports = router;
