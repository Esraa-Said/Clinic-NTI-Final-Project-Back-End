const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentsControllers');

router.post('/', departmentController.createDepartment);

router.get('/:id', departmentController.getDepartmentById);

router.put('/:id', departmentController.updateDepartment);

router.delete('/:id', departmentController.deleteDepartment);

router.get('/', departmentController.getAllDepartments);

module.exports = router;
