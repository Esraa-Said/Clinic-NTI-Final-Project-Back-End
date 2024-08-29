const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
      unique: true,
      validate: {
        validator: (value) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
        message: "Invalid email format",
      },
      trim: true,
    },
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
    role: { type: String, enum: ["Patient"], required: true },
    age: { type: Number, trim: true },
    gender: { type: String },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
