import React, { useEffect, useState } from "react";
import "./fileExplorer.css";
import Folder from "./folder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import AddFolder from "./addFolder";

function FileExplorer() {
  const [allFolders, setFolders] = useState([]);
  const navigate = useNavigate();

  const { jwtToken } = useAuth();

  useEffect(() => {
    GetFolders();
  }, []);

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const GetFolders = async () => {
    if (jwtToken) {
      try {
        const response = await fetch("http://localhost:8000/folder", {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();
        setFolders(data.folders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  const onAddFolder = async (formInputs) => {
    try {
      const response = await fetch("http://localhost:8000/folder/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({foldername: formInputs}),
      });

      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        console.log(allFolders);
        setFolders([...allFolders, newData.folder]);
      } else {
        console.error("addFolder failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const onDeleteClick = async (folderId)=>{
    try {
      const response = await fetch(`http://localhost:8000/folder/delete/${folderId}`,{
        method: "DELETE",
        headers: headers,
      });
      
      if(response.ok){
        setFolders(allFolders.filter((folder)=>folder._id !== folderId))
      }else {
        console.error("Failed to delete folder:", response.text);
      }
    } catch (error) {
      console.log("error deleting folder:", error);
    }
  }

  return (
    <React.Fragment>
      <div className="file-explorer">
        <h2>File Explorer</h2>
        <AddFolder handleAddFolder={onAddFolder} />
        <div className="grid-container">
          {allFolders.map((folder) => (
            <Folder key={folder._id} folderId={folder._id} folderName={folder.name} onDeleteClick={onDeleteClick}/>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default FileExplorer;
