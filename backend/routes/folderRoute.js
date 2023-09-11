const express = require("express");
const {getFolder, addFolder, deleteFolder} = require("../controllers/foldersController");
const authentication = require("../middlewares/authentication");

const router = express.Router()

router.get("/", authentication, getFolder);

router.post("/", authentication, addFolder);

router.delete("/delete/:folderId", authentication, deleteFolder);

module.exports = router;