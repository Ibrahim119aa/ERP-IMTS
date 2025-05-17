const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = require("../middlewares/upload");
const { viewProfile, addProfile, updateProfile, resetPassword,getAllUsers } = require("../controllers/profileController");
const router = express.Router();

// router.post("/add-profile", upload.single("photo"), addProfile);
router.get('/view-profile/:id', viewProfile);
// router.put('/update-profile/:id', upload.single("photo"), updateProfile);
router.put('/reset-password', resetPassword);
router.get('/getAllUsers', getAllUsers);

module.exports = router;
