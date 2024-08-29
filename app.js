const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctorRoutes');
const departmentsRoutes = require('./routes/departmentsRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const patientRoutes = require('./routes/patientRoutes');
const commonRoutes = require('./routes/commonRoutes');
const adminRoutes = require('./routes/adminRoutes');


const connectDB = require('./config/db');
require("dotenv").config();

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
connectDB();


app.use('/doctor', doctorRoutes);
app.use('/department', departmentsRoutes);
app.use('/appointment', appointmentsRoutes);
app.use('/patient', patientRoutes);
app.use('/user', commonRoutes);
app.use('/admin', adminRoutes);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
