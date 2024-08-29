const Appointment = require("../models/Appointments");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;
    const status = "Scheduled";
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      status,
    });
    await newAppointment.save();

    // Update the patient's appointments array
    await Patient.findByIdAndUpdate(patientId, {
      $push: { appointments: newAppointment._id },
    });

    // Update the doctor's appointments array
    await Doctor.findByIdAndUpdate(doctorId, {
      $push: { appointments: newAppointment._id },
    });

    // Remove the selected free slot from the doctor's freeSlots array
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $pull: { freeSlots: { date, time } } },
      { new: true, runValidators: true }
    );

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err); // Log the error
    res.status(500).send("Server error");
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name department");
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id)
      .populate("patientId", "name email")
      .populate("doctorId", "name department");

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.status(200).json(appointment);
  } catch (err) {
    console.error("Error fetching appointment:", err.message);
    res.status(500).send("Server error");
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, date, time} = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { patientId, doctorId, date, time},
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send("Appointment not found");
    }

    // patient and doctor data is updated
    await Patient.findByIdAndUpdate(patientId, {
      $addToSet: { appointments: updatedAppointment._id },
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $addToSet: { appointments: updatedAppointment._id },
    });

    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment:", err.message);
    res.status(500).send("Server error");
  }
};

exports.updateStatusAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId,status} = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {status},
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send("Appointment not found");
    }

    // patient and doctor data is updated
    await Patient.findByIdAndUpdate(patientId, {
      $addToSet: { appointments: updatedAppointment._id },
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $addToSet: { appointments: updatedAppointment._id },
    });

    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment:", err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).send("Appointment not found");
    }

    // Remove appointment from patient's and doctor's appointments array
    await Patient.findByIdAndUpdate(deletedAppointment.patientId, {
      $pull: { appointments: deletedAppointment._id },
    });

    await Doctor.findByIdAndUpdate(deletedAppointment.doctorId, {
      $pull: { appointments: deletedAppointment._id },
    });

    res.status(200).json({ message: "Appointment deleted" });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).populate(
      "doctorId",
      "name phoneNumber"
    );

    if (!appointments.length) {
      return res.status(404).send("No appointments found for this patient");
    }

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments by patient ID:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).populate(
      "patientId",
      "name phoneNumber"
    );

    if (!appointments.length) {
      return res.status(404).send("No appointments found for this doctor");
    }

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Error fetching appointments by doctor ID:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getDoctorAppointmentCount = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const appointmentCount = await Appointment.countDocuments({ doctor: doctorId });

    res.status(200).json({ count: appointmentCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAppointmentsCount = async (req, res) => {
  try {

    const appointmentCount = await Appointment.countDocuments({});

    res.status(200).json({ count: appointmentCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};