const universityController=require('../controllers/universityController');
const express=require("express");
const universityRouter=express.Router();

universityRouter.get("/get-university",universityController.getUniversity);
module.exports=universityRouter;