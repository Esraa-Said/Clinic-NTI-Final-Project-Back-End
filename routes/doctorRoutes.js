const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/count', doctorController.getDoctorCount);

router.post('/', doctorController.createDoctor);

router.get('/:id', doctorController.getDoctorById);

router.get('/name/:name', doctorController.getDoctorByName);

router.get('/:id/appointments', doctorController.getDoctorAppointments);

router.put('/:id', doctorController.updateDoctor);

router.put('/:id/changePassword', doctorController.changeDoctorPassword);


router.delete('/:id', doctorController.deleteDoctor);

router.get('/', doctorController.getAllDoctors);


router.post('/:id/freeSlot', doctorController.addFreeSlot);

router.put('/:id/freeSlot', doctorController.updateDoctorFreeSlots);

router.put('/:id/photo', doctorController.updateDoctorPhoto);

router.delete('/:id/freeSlot/:slotId', doctorController.removeFreeSlot);

router.get('/:id/slots/:date', doctorController.getSlotsForDay);



module.exports = router;
