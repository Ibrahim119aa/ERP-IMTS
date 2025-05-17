const specializationController=require('../controllers/specializationController');
const express=require("express");
const specializationRouter=express.Router();

specializationRouter.get("/get-specialization",specializationController.getSpecialization);
module.exports=specializationRouter;