const examController = require('../controllers/examController');

const express = require("express");
const examRouter = express.Router();

examRouter.get("/get-Exam-Batch", examController.getExam);
module.exports = examRouter;