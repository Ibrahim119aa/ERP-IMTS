const express = require("express");
const { getFee,getStudentsForExcel,getElligibleBatchById, getStudents, getElligibleBatch, getTotalPaid, getBatchList, getStudentFeeWithBatch, dataRefresh, updateStudentById, assignCounsellorToStudent, getBulkAssignManagerById, bulkAssignManager, getStudentById, bulkUpdateStudent } = require("../controllers/studentController");
const { authenticateToken, isCounselor, isAdmin } = require("../middlewares/middleware");



const router = express.Router();
router.post("/get-total-paid-fee", getTotalPaid);
router.post("/get-student-batch", getBatchList);
router.post("/get-Elligible-student-batch", getElligibleBatch);
router.post("/get-fee", getFee)
router.post("/students", getStudents);
router.get('/refresh', dataRefresh)
router.get('/students/:id', getStudentById)
router.put('/students/:student_id', updateStudentById)
router.put('/bulk-update', bulkUpdateStudent)
router.post('/bulk-assign', bulkAssignManager)
router.get('/assign-data/:manager_id', getBulkAssignManagerById)
router.put("/assign-counsellor-to-student", assignCounsellorToStudent);
router.post("/get-student-fee-with-batch", getStudentFeeWithBatch);
router.post("/student-excel",getStudentsForExcel);
router.post("/get-Elligible-student-batch-by-Id", getElligibleBatchById);
module.exports = router;