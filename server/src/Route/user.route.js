const express = require('express');
const router = express.Router();
const userController = require('../Controller/user.controller')
const verifyToken = require('../Middleware/auth')
const upload = require('../Middleware/uploadImg');

router.post('/login',userController.login)
router.get('/load', verifyToken, userController.load)
router.post('/register',userController.register)
router.put('/changePass',userController.changePassword)
router.put('/changeInfor',userController.changeInfor)
router.put('/changeAvatar', upload.single('avatar'),userController.changeAvatar)

module.exports = router