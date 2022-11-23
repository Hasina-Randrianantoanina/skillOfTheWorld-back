const router = require('express').Router();
const offreController = require('../controllers/offre.controller');
const upload = require('../middleware/upload.image');

//read offre
router.get('/', offreController.readOffre);
// read all offre where isValidate : true
router.get('/valide/', offreController.readOffreValide);

// afficher les offres que candidat a envoyer son CV
router.get('/postule/:id', offreController.readOffreCandidatPostule);
// verification de candidat a t'il postuler sur cette offre?
router.get('/:id/candidat/:idCandidat', offreController.checkCandidat);

//read one offre
router.get('/:id', offreController.readOneOffre);
// rehcerche de l'offre
router.get('/search/:key', offreController.searchOffre);
// recherche avance
router.get('/searchAvance/:key', offreController.searchOffre);

router.get('/entreprise/:id', offreController.readOffreEntreprise);

// read status of candidat
router.get('/status/:id', offreController.readCandidatStatus);
//create offre
router.post(
  '/',
  upload.single('uploadCouverture'),
  offreController.createOffre
);
//create offre
router.post('/withoutfile/', offreController.createOffreWithutfile);
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
module.exports = router;
