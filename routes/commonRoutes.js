const express = require('express');
const router = express.Router();
const commonControllers = require('../controllers/commonControllers');

router.post('/login', commonControllers.login);

module.exports = router;
