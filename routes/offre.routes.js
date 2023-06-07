const router = require('express').Router();
const offreController = require('../controllers/offre.controller');
const upload = require('../middleware/upload.file');
const uploadImage = require('../middleware/upload.image');

//read offre
router.get('/', offreController.readOffre);
// read all offre where isValidate : true
router.get('/valide/', offreController.readOffreValide);
// read all offre where isValidate : false
router.get('/nonvalide/', offreController.readOffreNonValide);
// read all offre where depublie
router.get('/depublie/', offreController.readOffreDepublie);

// afficher les offres que candidat a envoyer son CV
router.get('/postule/:id', offreController.readOffreCandidatPostule);
// verification de candidat a t'il postuler sur cette offre?
router.get('/:id/candidat/:idCandidat', offreController.checkCandidat);

//read one offre
router.get('/:id', offreController.readOneOffre);

router.get('/entreprise/:id', offreController.readOffreEntreprise);

// read status of candidat
router.get('/status/:id', offreController.readCandidatStatus);
//create offre
router.post(
  '/',
  uploadImage.single('uploadCouverture'),
  offreController.createOffre
);
//create offre
router.post('/withoutfile/', offreController.createOffreWithutfile);

//update offre
router.patch(
  '/update/:id',
  uploadImage.single('uploadCouverture'),
  offreController.updateOffre
);
//update offre
router.patch('/depublication/:id', offreController.depublication);
// validation de candidat
router.put('/validate/:id', offreController.repondreCandidat);

// depublie plusieurs offres
router.patch('/depublieMultiple', offreController.depublieMultiple);

// validation de CV de candidat
router.put('/validatecv/:id', offreController.valideCV);

// ajout de document 1
router.patch(
  '/documentone/:id',
  upload.single('uploadDocument'),
  offreController.addDocument1
);
// ajout de document 2
router.patch(
  '/documenttwo/:id',
  upload.single('uploadDocument2'),
  offreController.addDocument2
);

// validation de lm de candidat
router.put('/validatelm/:id', offreController.valideLM);
//delete offre
router.delete('/:id', offreController.deleteOffre);
// ajout de candidat avec cv et lm
router.patch(
  '/:id',
  upload.fields([{ name: 'file1' }, { name: 'file2' }]),
  offreController.addCandidat
);
router.patch('/theque/:id', offreController.addCandidatTheque);
// ajout de candidat avec cv
router.patch('/cv/:id', upload.single('file1'), offreController.addCandidatCV);
router.patch('/cvtheque/:id', offreController.addCandidatCVTheque);

// delete CV
router.patch('/deleteCV/:id', offreController.deleteCV);
// delete LM
router.patch('/deleteLM/:id', offreController.deleteLM);
// delete doc1
router.patch('/deleteDocOne/:id', offreController.deleteDocOne);
// delete doc 2
router.patch('/deleteDocTwo/:id', offreController.deleteDocTwo);
module.exports = router;
