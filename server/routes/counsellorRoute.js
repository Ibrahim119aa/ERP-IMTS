const express = require("express");
const counsellorRouter = express.Router();
const counsellorController = require('../controllers/counsellorController');


counsellorRouter.get("/get-counsellor-by-name", counsellorController.getCounsellorByName);
counsellorRouter.post("/add-counsellor", counsellorController.addCounsellor);
counsellorRouter.put("/assign-counsellor-to-manager", counsellorController.assignCounsellorToManager);
counsellorRouter.get("/get-counsellor", counsellorController.getCounsellor);
counsellorRouter.get("/get-single-counsellor", counsellorController.getSingleCounsellor);
counsellorRouter.delete("/delete-counselor/:id",counsellorController.deleteCounsellor)

module.exports = counsellorRouter;