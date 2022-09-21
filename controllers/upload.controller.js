const CandidatModel = require("../models/Candidat.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/error.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadImage = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("Invalid file");

    if (req.file.size > 500000) throw Error("Max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.sary + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      /* `${__dirname}/../client/public/uploads/profil/${fileName}` */
      `${__dirname}/./images/${fileName}`
    )
  );

  /* try {
    await CandidatModel.findByIdAndUpdate(
      req.body.candidatId,
      { $set : {picture: "./uploads/profil/" + fileName}},
      { new: true, upsert: true, setDefaultsOnInsert: true},
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  } */
};
