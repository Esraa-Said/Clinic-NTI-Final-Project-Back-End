const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentsControllers');
const authMiddleWare = require('../middlewares/authMiddleWare');


router.get('/count',  appointmentController.getAppointmentsCount);


router.get('/:doctorId/appointment-count', appointmentController.getDoctorAppointmentCount);


router.post('/',  appointmentController.createAppointment);

router.get('/',  appointmentController.getAllAppointments);

router.get('/:id',  appointmentController.getAppointmentById);

router.put('/:id',  appointmentController.updateAppointment);

router.put('/:id/status',  appointmentController.updateStatusAppointment);

router.delete('/:id',  appointmentController.deleteAppointment);

router.get('/patient/:patientId',  appointmentController.getAppointmentsByPatientId);

router.get('/doctor/:doctorId',  appointmentController.getAppointmentsByDoctorId);



module.exports = router;