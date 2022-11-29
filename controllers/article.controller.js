const Article = require('../models/Article.model');
const mongoose = require('mongoose');
const ObjectID = require('mongoose').Types.ObjectId;

// get all article
module.exports.getAllArticle = async (req, res) => {
  const article = await Article.find().sort({
    createdAt: -1,
  });

  res.status(200).send(article);
};

// get a single article
module.exports.getOneArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "L'article n'existe pas" });
  }
  const article = await Article.findById(id);
  if (!article) {
    return res.status(404).json({ error: "L'article n'existe pas" });
  }
  res.status(200).send(article);
};

// create a article
module.exports.createArticle = async (req, res) => {
  if (req.file) {
    const photoCouverture = req.file.path;
    const { titre, description } = req.body;
    try {
      const article = await Article.create({
        titre,
        description,
        photoCouverture,
      });
      res.status(200).send(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    const { titre, description } = req.body;
    try {
      const article = await Article.create({
        titre,
        description,
      });
      res.status(200).send(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// update article
module.exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "L'article n'existe pas" });
  }
  const article = await Article.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!article) {
    return res.status(400).json({ error: "L'article n'existe pas" });
  }
  res.status(200).send(article);
};

// delete article
module.exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "L'article n'existe pas" });
  }
  const article = await Article.findOneAndDelete({ _id: id });

  if (!article) {
    return res.status(400).json({ error: "L'article n'existe pas" });
  }

  res.status(200).json(article);
};
