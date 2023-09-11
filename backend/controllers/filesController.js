const File = require("../models/filesModel");
const fs = require("fs");
const path = require("path");
const { promisify } = require('util'); 
const rename = promisify(fs.rename);

const getFiles = async (req, res) => {
  const folderId = req.params.folderId;
  try {
    const queryParameter = { folder: `${folderId}` };
    const files = await File.find(queryParameter);

    res.json({ files });
  } catch (error) {
    console.log(error);
  }
};

const addFiles = async (req, res) => {
  const userId = req.user.userId;
  const folderId = req.body.folderId;
  try {
    if (req.file) {
      const newFile = new File({
        name: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        type: req.file.mimetype,
        user: userId,
        folder: folderId,
      });

      const result = await newFile.save();
      
      res.status(201).json({ file: newFile });
    } else {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded." });
    }
  } catch (error) {
    console.error("Error saving file to the database:", error);
  }
};

const deleteFiles = async (req, res) => {
 
  const fileId = req.params.fileId;
  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(file.path);
    await File.findByIdAndRemove(fileId);
    res.status(204).json({ message: "one file deleted" });
    console.log(`file deleted: ${fileId}`);
  } catch (error) {
    console.error("Error deleting a file:", error);
  }
};

const updateFile = async (req, res) => {
  const { fileId } = req.params;
  const { newName } = req.body;

  try {
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { name: newName },
      { new: true } 
    );
    
    if (!updatedFile) {
      console.log('File not found.');
      return res.status(404).json({ message: 'File not found.' });
    }

    console.log(`File name updated: ${updatedFile.name}`);
    res.status(200).json({ message: 'File name updated successfully.', updatedFile });
  } catch (error) {
    console.error('Error updating file name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getFiles, addFiles, deleteFiles, updateFile };
