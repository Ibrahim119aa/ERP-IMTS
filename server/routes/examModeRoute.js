const examModeController = require('../controllers/examModeController');
const express = require("express");
const examModeRouter = express.Router();

examModeRouter.post("/Add-Exam-Mode", examModeController.addExamMode);
examModeRouter.get("/get-exam-mode", examModeController.getExamMode);
examModeRouter.delete("/delete-exam-mode/:id", examModeController.deleteExamMode);
examModeRouter.get("/get-single-exam-mode/:id", examModeController.getSingleExamMode);
examModeRouter.put("/update-exam-mode/:id",examModeController.UpdateExamMode);

module.exports = examModeRouter;
