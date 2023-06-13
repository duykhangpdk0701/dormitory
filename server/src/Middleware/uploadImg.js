const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
var path = require('path')

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '../../public/images'));
    },

    //add back the extension
    filename: function (req, file, callback) {
        callback(null, uuidv4() + path.extname(file.originalname));
    },
});

module.exports = multer({ storage: storage })