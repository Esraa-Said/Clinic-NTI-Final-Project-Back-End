const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');  
require('dotenv').config();

exports.login = async (req, res) => {
    try {
  const { email, password } = req.body;

  let user = await Patient.findOne({ email });
  let role = 'Patient';

  if (!user) {
    user = await Doctor.findOne({ email });
    role = 'Doctor';
  }

  if (!user) {
    user = await Admin.findOne({ email });
    role = 'Admin';
  }

  if (!user) {
    return res.status(400).send('User Not Found');
  }

  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) {
    return res.status(400).send('User Not Found');
  }

  // Create a token with the user ID and role
  const token = jwt.sign(
    { userId: user._id, role: role },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token, role });
} catch(err){
    console.error(err);
    res.status(500).send('Server error');
}
};
