const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname, '../', 'temp');

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: uploadConfig,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    const error = new Error('Wrong format file for avatar');
    error.status = 400;
    cb(error);
  },
});

module.exports = upload;
