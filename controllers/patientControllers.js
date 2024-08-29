const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadPhoto = require("../config/multer");

exports.createPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      age,
      gender,
      appointments,
      photo,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = await Patient.create({
      name,
      email,
      hashedPassword,
      phoneNumber,
      photo,
      age,
      gender,
      appointments,
      role: "Patient",
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("appointments");
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "appointments"
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientByName = async (req, res) => {
  try {
    const patient = await Patient.findOne({ name: req.params.name }).populate(
      "appointments"
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientsByDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).populate(
      "patient"
    );
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find the patients associated with this doctor
    const patients = await Patient.find({
      _id: { $in: doctor.patients },
    }).populate("appointments");
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("appointments");

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    console.log("Updated Patient Data:", patient);
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePatientPhoto = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { photo: req.body.photo },
      {
        new: true,
        runValidators: true,
      }
    ).populate("appointments");
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changePatientPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await Patient.findById(req.params.id);

    if (!user) {
      return res.status(404).send("Patient not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the patient's password
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { hashedPassword: hashedPassword },
      { new: true, runValidators: true }
    );

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientCount = async (req, res) => {
  try {
    const patientCount = await Patient.countDocuments();
    res.status(200).json({ count: patientCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
