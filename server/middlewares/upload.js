// middlewares/upload.js
const express=require("express");
const uploadImage=express.Router();

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});





uploadImage.post("/Save-Images", upload.array("image", 10), async (req, res) => {
    console.log("Memion");
    
  res.json(
    {
      Status: true
    }
  );

})

module.exports = uploadImage;
