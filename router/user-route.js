const express = require("express");
const router = express.Router();
const { registration } = require("../controllers/user-registration-controller");
const { login } = require("../controllers/user-login");
const authMiddleware = require("../middleware/auth-middleware");
const {staffData, getStaffData, studentData, getStudentData, deleteStaff, deleteStudentData} = require("../controllers/dashboard-controller");

router.post("/register", registration);
router.post("/", login);
router.post("/dashboard/:username/:schoolName/add/staff",authMiddleware, staffData);
router.get("/dashboard/:username/:schoolName/staff",authMiddleware, getStaffData);
router.delete("/dashboard/:username/:schoolName/delete/staff/:id",authMiddleware, deleteStaff);
router.post("/dashboard/:username/:schoolName/add/student",authMiddleware, studentData);
router.get("/dashboard/:username/:schoolName/student",authMiddleware, getStudentData);
router.delete("/dashboard/:username/:schoolName/delete/student/:id",authMiddleware, deleteStudentData);

module.exports = router;