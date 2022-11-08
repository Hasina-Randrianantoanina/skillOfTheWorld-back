const express = require('express');

const candidatCtlr = require('../controllers/candidat.controller');
const router = express.Router();

const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './images');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.post('/signup', candidatCtlr.signup);
router.post('/login', candidatCtlr.singIn);



// ROUTE POR AJOUTER CV
router.patch('/addCV/:id', upload.single('file1'), candidatCtlr.addCV);
// ROUTE POR AJOUTER LM

router.patch('/addLM/:id', upload.single('file1'), candidatCtlr.addLM);

//route pour deconnexion
router.get('/logout', candidatCtlr.logout);
// route de verification de mail
router.get('/verification/:id', candidatCtlr.verificationCandidat);

// get un candidat
router.get('/:id', candidatCtlr.readOneCandidat);
// update candidat
router.patch('/:id', upload.single('uploadLogo'), candidatCtlr.updateCandidat);
// initialize mot de passe
router.patch('/initialise/:id', candidatCtlr.updatePassword);

module.exports = router;
