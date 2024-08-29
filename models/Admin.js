const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      trim: true,

      validate: {
        validator: (value) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
        message: "Invalid email format",
      },
    },
    hashedPassword: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,

      validate: {
        validator: (value) => /^\d{12}$/.test(value),
        message: "Invalid phone number format",
      },
    },
    age: { type: Number, trim: true },
    photo: { type: String },
    gender: { type: String },
    role: { type: String, enum: ["Admin"], required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
