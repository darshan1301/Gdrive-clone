import React, { useState } from "react";
import "./addFolderButton.css";
import { useDispatch, useSelector } from "react-redux";
import { addFolderHandler } from "../../services/folder.services";
import { useAuth } from "../../authContext/AuthContext";
import { addFolder } from "./folderSlice";

function AddFolder() {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const { jwtToken } = useAuth();
  const allFolders = useSelector((state) => state.folders.folder);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Creating folder: ${folderName}`);

    const response = await addFolderHandler(jwtToken, folderName);

    if (response.ok) {
      const newData = await response.json();
      console.log(newData);
      console.log(allFolders);
      dispatch(addFolder(newData.folder));
    } else {
      console.error("addFolder failed:", response.statusText);
    }

    setFolderName("");
  };

  return (
    <form className="new-folder-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleInputChange}
        className="new-folder-input"
      />
      <button type="submit" className="create-folder-button">
        Create Folder
      </button>
    </form>
  );
}

export default AddFolder;
