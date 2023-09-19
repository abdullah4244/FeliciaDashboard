const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './storage/upload'
        fs.mkdirSync(dir,{recursive :true})
        cb(null, './storage/upload');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
});

module.exports = upload;