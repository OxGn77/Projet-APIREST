const express = require('express');
const authController = require('../controller/auth.controller.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authController.me);
router.post('/logout', authController.logout);

module.exports = router;
