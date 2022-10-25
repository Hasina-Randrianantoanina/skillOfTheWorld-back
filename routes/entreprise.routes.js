const express = require('express');

const entrepriseCtlr = require('../controllers/entreprise.controller');

const router = express.Router();

router.post('/signup', entrepriseCtlr.signup);
router.post('/login', entrepriseCtlr.singIn);
router.get('/logout', entrepriseCtlr.logout);

router.get('/:id', entrepriseCtlr.readOneEntreprise);
router.patch('/:id', entrepriseCtlr.updatEntreprise);

module.exports = router;
