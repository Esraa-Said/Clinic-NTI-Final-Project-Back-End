const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to confirm that the user can enter this area
const authMiddleWare = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access is denied, token missing" });
  }
  try {
    const verified = jwt.verify(token, process.env.secretKey);

    switch (verified.role) {
      case "Admin":
        req.user = await Admin.findById(verified.userId, {
          photo: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          hashedPassword: 0,
        });
        break;
      case "Patient":
        req.user = await Patient.findById(verified.userId, {
          photo: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          hashedPassword: 0,
        });
      case "Doctor":
        req.user = await Doctor.findById(verified.userId, {
          photo: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          hashedPassword: 0,
        });
      default:
        break;
    }

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleWare;
