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
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
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

router.patch('/addCV/:id', upload.single('file1'), candidatCtlr.addCV);
router.get('/logout', candidatCtlr.logout);

// get un candidat
router.get('/:id', candidatCtlr.readOneCandidat);
// update candidat
router.patch('/:id', candidatCtlr.updateCandidat);
module.exports = router;
