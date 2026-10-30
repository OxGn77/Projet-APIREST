const express = require('express');
const authController = require('../controller/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me',authMiddleware.auth, authController.me);
router.post('/logout', authController.logout);

module.exports = router;
