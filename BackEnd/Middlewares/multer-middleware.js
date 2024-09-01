const multer = require('multer');
const path = require('path');

//Creating Multer Instance
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
const upload = multer({ storage });

module.exports = upload;