const courseController = require('../controllers/courseController');
const express = require("express");
const courseRouter = express.Router();

courseRouter.get("/get-course", courseController.getCourse);
module.exports = courseRouter;