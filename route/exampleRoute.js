const express = require('express');
const exampleController = require('../controller/exampleController.js');
const exampleMiddleware = require('../middleware/exampleMiddleware.js');

const router = express.Router();

router.get('/health', exampleMiddleware, exampleController.healthcheck);

module.exports = router;
