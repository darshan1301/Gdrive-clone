const express = require("express");
const multer = require("multer");
const {
  getFiles,
  addFiles,
  deleteFiles,
  updateFile,
} = require("../controllers/filesController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./filesio");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/:folderId", authentication, getFiles);

router.post("/", authentication, upload.single("mediaFile"), addFiles);

router.delete("/:fileId", authentication, deleteFiles);

router.put("/:fileId", authentication, updateFile);

module.exports = router;
