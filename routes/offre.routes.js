const router = require('express').Router();
const offreController = require('../controllers/offre.controller');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
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

//read offre
router.get('/', offreController.readOffre);
// read all offre where isValidate : true
router.get('/valide/', offreController.readOffreValide);

// read all offre when he have send his cv
router.get('/postule/:id', offreController.readOffreCandidatPostule);
// verification de candidat
router.get('/:id/candidat/:idCandidat', offreController.checkCandidat);

//read one offre ajouter par aubin
router.get('/:id', offreController.readOneOffre);

router.get('/entreprise/:id', offreController.readOffreEntreprise);

// read status of candidat
router.get('/status/:id', offreController.readCandidatStatus);
//create offre
router.post('/', offreController.createOffre);
//update offre
router.patch('/update/:id', offreController.updateOffre);
// validation de candidat
router.put('/validate/:id', offreController.repondreCandidat);

// validation de CV de candidat
router.put('/validatecv/:id', offreController.valideCV);

// validation de lm de candidat
router.put('/validatelm/:id', offreController.valideLM);
//delete offre
router.delete('/:id', offreController.deleteOffre);
// ajout de candidat ajouter par aubin
router.patch(
  '/:id',
  upload.fields([{ name: 'file1' }, { name: 'file2' }]),
  offreController.addCandidat
);

// router.patch('/:id', upload.single('file'), offreController.addCandidat);
router.patch('/cv/:id', upload.single('file1'), offreController.addCandidatCV);
module.exports = router;
