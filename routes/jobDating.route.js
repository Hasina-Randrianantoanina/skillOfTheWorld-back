const express = require('express');
const jobDatingRoute = require('../controllers/jobDating.controller');
const upload = require('../middleware/upload.image');
const uploadFile = require('../middleware/upload.file');

const router = express.Router();

// GET all job dating publie
router.get('/publie', jobDatingRoute.getJobDatingValide);

// GET all job dating not publie
router.get('/notpublie', jobDatingRoute.getJobDatingNonValide);

// GET all job dating from entreprise
router.get('/entreprise/:id', jobDatingRoute.getJobDAtingEntreprise);

// GET a single job dating
router.get('/:id', jobDatingRoute.getOneJobDating);

// rehcerche de job dating
router.get('/search/:key', jobDatingRoute.searchJobDating);

// POST a new job dating
router.post(
  '/',
  upload.single('photoCouverture'),
  jobDatingRoute.createJobDating
);
// demande de participation à job dating
router.patch('/participation/:id', jobDatingRoute.ajoutCandidat);

// DELETE a job dating
router.delete('/:id', jobDatingRoute.deleteJobDating);

// UPDATE a job dating
router.patch('/:id', jobDatingRoute.updateJobDating);

// UPDATE a job dating with image
router.patch(
  '/image/:id',
  upload.single('photoCouverture'),
  jobDatingRoute.updateJobDatingImage
);

router.patch(
  '/postule/:id',
  uploadFile.single('cv'),
  jobDatingRoute.ajoutCandidat
);

module.exports = router;
