const Doctor = require("../models/Doctor");
const Department = require("../models/Departments");
const Appointment = require("../models/Appointments");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      photo,
      department,
      appointments,
      freeSlots,
      age,
      gender,
    } = req.body;
    const password = "123";
    const existingDepartment = await Department.findById(department);
    if (!existingDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      email,
      hashedPassword,
      department,
      phoneNumber,
      photo,
      age,
      gender,
      appointments,
      role: "Doctor",
      freeSlots,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("department")
      .populate("appointments");

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctorByName = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      name: { $regex: req.params.name, $options: "i" }, // case-insensitive
    })
      .populate("appointments")
      .populate("department");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "appointments"
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor.appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("department")
      .populate("appointments");
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    console.log("Updated doctor Data:", doctor);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateDoctorPhoto = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { photo: req.body.photo }, {
      new: true,
      runValidators: true,
    })
      .populate("department")
      .populate("appointments");
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changeDoctorPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let user = await Doctor.findById(  req.params.id );

    if (!user) {
      return res.status(404).send("Doctor not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { hashedPassword: hashedPassword },
      { new: true, runValidators: true }
    );

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    // Find and delete the doctor
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Delete all appointments associated with this doctor
    await Appointment.deleteMany({ doctorId: doctor._id });

    res.status(200).json({ message: "Doctor and associated appointments deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("department")
      .populate("appointments");

    if (!doctors) {
      return res.status(404).json({ message: "No doctors found" });
    }
    res.json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addFreeSlot = async (req, res) => {
  try {
    const freeSlots = req.body;

    if (!Array.isArray(freeSlots)) {
      return res
        .status(400)
        .json({ error: "Invalid data format: freeSlots should be an array" });
    }

    // Find the doctor
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Merge the existing freeSlots with the new ones
    doctor.freeSlots = [...doctor.freeSlots, ...freeSlots];

    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDoctorFreeSlots = async (req, res) => {
  try {
    const { freeSlots } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { freeSlots },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeFreeSlot = async (req, res) => {
  try {
    const { slotId } = req.params;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $pull: { freeSlots: { _id: slotId } } },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSlotsForDay = async (req, res) => {
  try {
    const { date } = req.params;

    const doctor = await Doctor.findOne(
      { _id: req.params.id, "freeSlots.date": date },
      { "freeSlots.$": 1 }
    );

    if (!doctor) {
      return res.status(404).json({ error: "No slots found for this date." });
    }

    res.status(200).json(doctor.freeSlots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctorCount = async (req, res) => {
  try {
    const doctorCount = await Doctor.countDocuments();
    res.status(200).json({ count: doctorCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
