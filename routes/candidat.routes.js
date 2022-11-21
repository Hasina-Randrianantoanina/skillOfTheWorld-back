const express = require('express');
const candidatCtlr = require('../controllers/candidat.controller');
const router = express.Router();
const upload = require('../middleware/upload.image');
const uploadFile = require('../middleware/upload.file');

router.post('/signup', candidatCtlr.signup);
router.post('/login', candidatCtlr.singIn);

// ajout de cv
router.patch('/addCV/:id', uploadFile.single('file1'), candidatCtlr.addCV);
// suppression de cv
router.patch('/removeCV/:id/idcv/:idcv', candidatCtlr.deleteCV);
// ajout lm
router.patch('/addLM/:id', uploadFile.single('file1'), candidatCtlr.addLM);
// suppression de lm
router.patch('/removeLM/:id/idlm/:idlm', candidatCtlr.deleteLM);
//route pour deconnexion
router.get('/logout', candidatCtlr.logout);
// route de verification de mail
router.get('/verification/:id', candidatCtlr.verificationCandidat);
// get all  candidat
router.get('/', candidatCtlr.readAllCandidat);
// get one candidat
router.get('/:id', candidatCtlr.readOneCandidat);

router.get('/email/:email', candidatCtlr.checkMailCandidat);
// update candidat
router.patch('/:id', upload.single('uploadLogo'), candidatCtlr.updateCandidat);
router.patch('/action/:id', candidatCtlr.updateCandidatAction);
// initialize mot de passe
router.patch('/initialise/:id', candidatCtlr.updatePassword);
// reset password by email
router.patch('/reset/:id', candidatCtlr.updatePasswordEmail);

module.exports = router;
