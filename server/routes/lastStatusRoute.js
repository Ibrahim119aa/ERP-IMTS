const lastStatusController=require('../controllers/lastStatusController');
const express=require("express");
const lastStatusRouter=express.Router();

lastStatusRouter.post("/Add-Last-Status",lastStatusController.addLastStatus);
lastStatusRouter.get("/get-last-status",lastStatusController.getLastStatus);
lastStatusRouter.delete("/delete-last-status/:id",lastStatusController.deleteLastStatus);
lastStatusRouter.get("/get-single-last-status/:id",lastStatusController.getSingleLastStatus);
lastStatusRouter.put("/Update-Last-Status/:id",lastStatusController.UpdateLastStatus);
module.exports=lastStatusRouter;
