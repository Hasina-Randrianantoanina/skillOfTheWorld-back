const express = require('express');
const candidatCtlr = require('../controllers/candidat.controller');
const router = express.Router();
const upload = require('../middleware/upload.image');
const uploadFile = require('../middleware/upload.file');

router.post('/signup', candidatCtlr.signup);
router.post('/login', candidatCtlr.singIn);

// ajout de cv
router.patch('/addCV/:id', uploadFile.single('file1'), candidatCtlr.addCV);
// ajout lm
router.patch('/addLM/:id', uploadFile.single('file1'), candidatCtlr.addLM);
//route pour deconnexion
router.get('/logout', candidatCtlr.logout);
// route de verification de mail
router.get('/verification/:id', candidatCtlr.verificationCandidat);
// get all  candidat
router.get('/', candidatCtlr.readAllCandidat);
// get one candidat
router.get('/:id', candidatCtlr.readOneCandidat);
// update candidat
router.patch('/:id', upload.single('uploadLogo'), candidatCtlr.updateCandidat);
router.patch('/action/:id', candidatCtlr.updateCandidatAction);
// initialize mot de passe
router.patch('/initialise/:id', candidatCtlr.updatePassword);

module.exports = router;
