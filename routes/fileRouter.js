const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware')
const fileController = require("../controllers/fileController");
const upload = require('../middlewares/multerConfig');
const router = express.Router();
router.use(authMiddleWare.protect)
router.route('/').get(fileController.getAllFiles).post(upload.single('file'),fileController.createFile)
router.get('/filters' , fileController.getAllFilters)
module.exports = router;