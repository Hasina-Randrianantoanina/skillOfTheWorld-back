const express = require("express");

const candidatCtlr = require("../controllers/candidat.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

const CandidatModel = require("../models/Candidat.model");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".." + file.originalname);
  },
});

//storage
/* const Storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}); */

//const upload = multer();
const upload = multer({ storage: fileStorageEngine });
/* const upload = multer({
  storage: Storage,
}).single("testImage"); */

const router = express.Router();

router.post("/signup", candidatCtlr.signup);
router.post("/login", candidatCtlr.singIn);
router.get("/logout", candidatCtlr.logout);

// get un candidat 
router.get("/:id", candidatCtlr.readOneCandidat);

//upload image
//router.post("/upload", upload.single("file"), uploadController.uploadImage);
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  res.send("ok tafiditra sary");

  /* try {
    await CandidatModel.findByIdAndUpdate(
      req.body.candidatId,
      { $set: { picture: "./images/" + filename } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  } */
});

/* router.post("upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new CandidatModel({
        image: {
          data: req.file.filename,
          contentType: "image/jpeg",
        },
      });
      newImage
        .save()
        .then(() => res.send("tafiditra sary"))
        .catch((err) => console.log(err));
    }
  });
}); */

module.exports = router;
