const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.post("/", adminController.createAdmin);

router.get("/", adminController.getAllAdmins);

router.get("/:id", adminController.getAdminById);

router.put("/:id", adminController.updateAdmin);

router.delete("/:id", adminController.deleteAdmin);


router.put('/:id/photo', adminController.updateAdminPhoto);

router.put('/:id/changePassword', adminController.changeAdminPassword);

module.exports = router;
