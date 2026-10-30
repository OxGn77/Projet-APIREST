const express = require('express');
const router = express.Router();
const authCOntroller = require('../controller/auth.controller.js');
const exampleMiddleware = require('../middleware/exampleMiddleware.js');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/health', exampleMiddleware, authController.healthcheck);

module.exports = router;
