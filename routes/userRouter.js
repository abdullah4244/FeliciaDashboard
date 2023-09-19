const express = require('express')
const userController = require('../controllers/userController');
const router = express.Router()

router.post('/login' ,userController.logIn)
router.get('/me',userController.getMe)
router.post('/logout',userController.logOut)
module.exports = router;