import React from "react";
import "./folder.css";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderId, folderName, onDeleteClick }) => {
  const navigate = useNavigate();
  
  const handleNavigateClick = () => {
    
    navigate(`/file/${folderName}/${folderId}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDeleteClick(folderId);
  };

  return (
    <div className="folder-item">
      <svg
        onClick={handleNavigateClick}
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        className="folder-icon">
        <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z"></path>
      </svg>
      <span className="folder-name">{folderName}</span>
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default Folder;
