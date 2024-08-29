const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
        message: "Invalid email format",
      },
    },
    age: { type: Number, trim: true },

    hashedPassword: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^\d{12}$/.test(value),
        message: "Invalid phone number format",
      },
      trim: true,
    },
    photo: { type: String },
    gender: { type: String },

    role: { type: String, enum: ["Doctor"], required: true },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    freeSlots: [
      {
        date: { type: Date },
        time: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
