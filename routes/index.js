const express = require('express');
const doctorRoutes = require('./doctorRoutes');
const patientRoutes = require('./patientRoutes');

const router = express.Router();

router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);

module.exports = router;
