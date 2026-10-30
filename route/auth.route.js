const express = require('express');
const exampleController = require('../controller/auth.controller.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signin',authController.signin);
router.get('/me', authController.me);
router.post('/logout', authController.logout);

module.exports = router;
