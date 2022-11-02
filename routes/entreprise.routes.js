const express = require('express');

const entrepriseCtlr = require('../controllers/entreprise.controller');

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

router.post('/signup', entrepriseCtlr.signup);
router.post('/login', entrepriseCtlr.singIn);
router.get('/logout', entrepriseCtlr.logout);

router.get('/verification/:id', entrepriseCtlr.verificationEntreprise);
router.get('/:id', entrepriseCtlr.readOneEntreprise);
router.patch(
  '/:id',
  upload.single('uploadLogo'),
  entrepriseCtlr.updatEntreprise
);
router.patch('/initialise/:id', entrepriseCtlr.updatePassword);
module.exports = router;
