const express = require("express");

const candidatCtlr = require("../controllers/candidat.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
/* const fileStorageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".." + file.originalname);
  },
}); */

const upload = multer();
// const upload = multer({ storage: fileStorageEngine });

const router = express.Router();

router.post("/signup", candidatCtlr.signup);
router.post("/login", candidatCtlr.singIn);
router.get("/logout", candidatCtlr.logout);

//upload image
router.post("/upload", upload.single("file"), uploadController.uploadImage);
/* router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("ok tafiditra sary");
}); */

module.exports = router;
