const express=require("express");
const managerRoute=express.Router();
const managerController=require('../controllers/manageController');

managerRoute.post("/add-manager",managerController.addManager);
managerRoute.get("/get-manager",managerController.getManager);
managerRoute.get("/get-single-manager",managerController.getSingleManager)
managerRoute.delete("/delete-manager/:id",managerController.deletemanager);

module.exports=managerRoute;