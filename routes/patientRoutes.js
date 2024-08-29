const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientControllers');

const authMiddleWare = require("../config/auth");

router.get('/count', patientController.getPatientCount);

router.post('/', patientController.createPatient);

router.get('/', patientController.getAllPatients);

router.get('/:id', patientController.getPatientById);

router.get('/name/:name', patientController.getPatientByName);

router.get('/doctor/:doctorId', patientController.getPatientsByDoctor);

router.put('/:id', patientController.updatePatient);

router.put('/:id/photo', patientController.updatePatientPhoto);


router.put('/:id/changePassword', patientController.changePatientPassword);

router.delete('/:id', patientController.deletePatient);




module.exports = router;
