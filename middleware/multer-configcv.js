const multerCV = require('multer');

const MIME_TYPES = {
  'uploadCV/docx': 'docx',
  'uploadCV/pdf': 'pdf',
};

const storage = multerCV.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'cv');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multerCV({ storage: storage }).single('uploadCV');
