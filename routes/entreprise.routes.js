const express = require('express');
const entrepriseCtlr = require('../controllers/entreprise.controller');
const router = express.Router();
const upload = require('../middleware/upload.image');

router.post('/signup', entrepriseCtlr.signup);
router.post('/login', entrepriseCtlr.singIn);
router.get('/logout', entrepriseCtlr.logout);
router.get('/loggedInEntreprise', entrepriseCtlr.loggedInEntreprise);

// get all  entreprise
router.get('/', entrepriseCtlr.readAllEntreprise);
router.get('/verification/:id', entrepriseCtlr.verificationEntreprise);
router.get('/:id', entrepriseCtlr.readOneEntreprise);

router.get('/email/:email', entrepriseCtlr.checkMailEntreprise);
router.patch(
  '/:id',
  upload.single('uploadLogo'),
  entrepriseCtlr.updatEntreprise
);
router.patch('/initialise/:id', entrepriseCtlr.updatePassword);
router.patch('/reset/:id', entrepriseCtlr.updatePasswordEmail);
module.exports = router;
