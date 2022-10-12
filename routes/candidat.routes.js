const express = require('express');

const candidatCtlr = require('../controllers/candidat.controller');
const router = express.Router();
const multerCV = require('../middleware/multer-configcv');

router.post('/signup', candidatCtlr.signup);
router.post('/login', candidatCtlr.singIn);

router.patch('/addCV', multerCV, candidatCtlr.addCV);
router.get('/logout', candidatCtlr.logout);

// get un candidat
router.get('/:id', candidatCtlr.readOneCandidat);
module.exports = router;
