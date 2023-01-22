const multer = require('multer');

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error("Les fichiers valides sont d'extension jpg ou jpeg ou png")
      );
    }
    cb(undefined, true); // continue with upload
  },
});
