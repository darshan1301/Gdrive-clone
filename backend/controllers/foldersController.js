const Folder = require("../models/foldersModel");
const File = require("../models/filesModel");
const fs = require("fs");

const getFolder = async(req, res)=>{
  const userId = req.user.userId;
  try {
    const queryParameter = {user:`${userId}`};
    const folders = await Folder.find(queryParameter);

    res.json({folders});
  } catch (error) {
    console.log(error);
  }
}

const addFolder = async (req, res)=>{
  const userId = req.user.userId;
  const folderName = req.body.foldername;

  try {
    const newFolder = new Folder({
      name: folderName,
      user: userId
    });

    await newFolder.save();

    res.status(200).json({ folder: newFolder });
  } catch (error) {
   console.log(error); 
   res.status(500).json({ message: "could not add folder" });
  }
}

const deleteFolder = async (req, res)=>{
  const folderId = req.params.folderId;
  try {    
    const folder = await Folder.findById(folderId);
    
    if (!folder) {
      console.log("folder not found.");
      return res.status(404).send("folder not found.");
    }

    const filesToDelete = await File.find({ folder: folderId });

    filesToDelete.forEach((file) => {
      try {
        fs.unlinkSync(file.path);
        console.log(`Deleted file: ${file.name}`);
      } catch (error) {
        console.error(`Error deleting file: ${file.name}`, error);
      }
    });

    const deleteResult = await File.deleteMany({ folder: folderId });

    const result = await Folder.findByIdAndRemove(folderId);
    res.status(204).json({message:"one folder deleted."});
    
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
}

module.exports = {getFolder, addFolder, deleteFolder};
