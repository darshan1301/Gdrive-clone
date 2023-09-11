import React, { useState } from 'react';
import "./addFolderButton.css";

function AddFolder({handleAddFolder}) {
  const [folderName, setFolderName] = useState('');

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddFolder(folderName);
    console.log(`Creating folder: ${folderName}`);

    setFolderName('');
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
