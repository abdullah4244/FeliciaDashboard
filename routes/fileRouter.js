const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware')
const fileController = require("../controllers/fileController");
const upload = require('../middlewares/multerConfig');
const router = express.Router();
router.use(authMiddleWare.protect)
router.route('/').get().post(upload.single('file'),fileController.createFile)
module.exports = router;