const express = require('express');
const articleRoute = require('../controllers/article.controller');
const upload = require('../middleware/upload.image');

const router = express.Router();

// GET all article
router.get('/', articleRoute.getAllArticle);

// GET a single article
router.get('/:id', articleRoute.getOneArticle);

// POST a new article
router.post('/', upload.single('photoCouverture'), articleRoute.createArticle);

// DELETE article
router.delete('/:id', articleRoute.deleteArticle);

// UPDATE a article
router.patch(
  '/:id',
  upload.single('photoCouverture'),
  articleRoute.updateArticle
);

module.exports = router;
