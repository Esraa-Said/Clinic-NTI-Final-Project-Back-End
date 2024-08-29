# **Medical Appointment Booking System**

* **Front End Repository:** https://github.com/Esraa-Said/Clinic-NTI-Final-Project-Front-End
* **Back End Repository:** https://github.com/Esraa-Said/Clinic-NTI-Final-Project-Back-End

## **Table of Contents**

1. Project Overview
2. Technologies Used
3. API Endpoints
4. Installation
5. Run Locally
6. Contact

## **Project Overview**
The Medical Appointment Booking System is a web application designed to simplify the process of booking and managing medical appointments. It allows patients to view available time slots for doctors, book appointments, and manage their bookings. Doctors can manage their availability and view their appointments. Admins have control over the system, including managing doctors, patients, and appointment data.

## **Technologies Used**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## **API Endpoints**
* **Admin Endpoints:**
    * `POST /admin`: Create Admin.
    * `POST /user/login`: Login.
    * `GET /admin`: List all admins.
    * `GET /admin/:id`: Get admin by id.
    * `PUT /admin/:id`: Update admin's personal information.
    * `PUT /admin/:id/photo`: Update admin's photo.
    * `PUT /admin/:id/changePassword`: Update admin's password.
    * `DELETE /admin/:id`: Delete admin.

* **Doctors Endpoints:**
    * `POST /doctor`: Create doctor.
    * `POST /user/login`: Login.
    * `GET /doctor`: List all doctors.
    * `GET /doctor/:id`: Get doctor by id.
    * `GET /doctor/name/:name`: Get doctor by name.
    * `GET /doctor/count`: Get doctor count.
    * `POST /doctor/:id/freeSlot`: Add free slot.
    * `PUT /doctor/:id/freeSlot`: Update free slot.
    * `PUT /doctor/:id/freeSlot/:slotId`: Delete free slot.
    * `PUT /doctor/:id`: Update doctor's personal information.
    * `PUT /doctor/:id/photo`: Update doctor's photo.
    * `PUT /doctor/:id/changePassword`: Update doctor's password.
    * `DELETE /doctor/:id`: Delete doctor.

* **Patients Endpoints:**
    * `POST /patient`: Register.
    * `POST /user/login`: Login.
    * `GET /patient`: List all patients.
    * `GET /patient/:id`: Get patient by id.
    * `GET /patient/name/:name`: Get patient by name.
    * `GET /patient/count`: Get patient count.
    * `GET /patient/doctor/:doctorId`: Get doctor's patients.
    * `PUT /patient/:id`: Update patient's personal information.
    * `PUT /patient/:id/photo`: Update patient's photo.
    * `PUT /patient/:id/changePassword`: Update patient's password.
    * `DELETE /patient/:id`: Delete patient.


* **Departments Endpoints:**
    * `POST /department`: Create department.
    * `GET /department`: List all departments.
    * `GET /department/:id`: Get department by id.
    * `PUT /department/:id`: Update department.
    * `DELETE /department/:id`: Delete department.


* **Appointments Endpoints:**
    * `POST /appointment`: Create appointment.
    * `GET /appointment`: List all appointments.
    * `GET /appointment/:id`: Get appointment by id.
    * `GET /appointment/patient/:patientId`: Get patient's appointments.
    * `GET /appointment/doctor/:doctorId`: Get doctor's appointments.
    * `PUT /appointment/:id`: Update appointment.
    * `PUT /appointment/:id/status`: Update appointment's status.
    * `DELETE /appointment/:id`: Delete appointment.




## **Installation**
* Prerequisites
    - Node.js and npm installed on your machine.
    - MongoDB database set up.

## **Steps to Run Locally**
* **Clone Front and back repositories:**
    * git clone https://github.com/Esraa-Said/Clinic-NTI-Final-Project-Front-End.git
    * git clone https://github.com/Esraa-Said/Clinic-NTI-Final-Project-Back-End.git


* **Install Dependencies:**
    * npm install

## **Start the Backend Server:**
* npm start
## **Start the Frontend Development Server:**
* ng serve

## Access the Application:
* Open your browser and navigate to http://localhost:4200.

## Contact
* **Esraa Said:** https://www.linkedin.com/in/esraa-said-152516249/ 
* **Email:** esaid6586@gmail.com