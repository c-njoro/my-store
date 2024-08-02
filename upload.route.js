const express = require("express");
const uploadRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const productUpload = multer({ storage: productStorage });

uploadRouter.post("/upload", upload.single("profilePicture"), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

uploadRouter.post(
  "/uploadProducts",
  productUpload.array("images", 10),
  (req, res) => {
    try {
      let fileInfos = req.files.map((file) => ({
        public_id: file.filename,
        url: file.path,
      }));
      res.status(200).json({ fileInfos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = uploadRouter;
