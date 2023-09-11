import React, { useState, useEffect } from "react";
import "./file.css";
import FileUpload from "../shared/fileUpload";
import { useAuth } from "../authentication/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const File = () => {
  const [files, setFiles] = useState([]);
  const [updatingFileId, setUpdatingFileId] = useState(null);
  const [updatedFileName, setUpdatedFileName] = useState("");

  const navigate = useNavigate();
  const { folderId, folderName } = useParams();

  const { jwtToken } = useAuth();

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  useEffect(() => {
    GetFiles();
  }, []);

  const GetFiles = async () => {
    if (jwtToken) {
      try {
        const response = await fetch(`http://localhost:8000/file/${folderId}`, {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  const AddFiles = async (formInputs) => {
    try {
      const response = await fetch("http://localhost:8000/file/", {
        method: "POST",
        headers: headers,
        body: formInputs,
      });

      console.log(response);

      if (response.ok) {
        const newData = await response.json();
        console.log(newData);
        setFiles([...files, newData.file]);
        console.log(files);
      } else {
        console.error("add file failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const DeleteFiles = async (e, fileId) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/file/${fileId}`, {
        method: "DELETE",
        headers: headers,
      });
      if (response.ok) {
        console.log("file deleted successfully");
        setFiles(files.filter((file) => file._id !== fileId));
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const UpdateFileName = async (fileId, newName) => {
    try {
      const response = await fetch(`http://localhost:8000/file/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ newName }),
      });

      if (response.ok) {
        const updatedFiles = [...files];

        const indexToUpdate = updatedFiles.findIndex(
          (file) => file._id === fileId
        );

        if (indexToUpdate !== -1) {
          updatedFiles[indexToUpdate] = {
            ...updatedFiles[indexToUpdate],
            name: newName,
          };
          setFiles(updatedFiles);
          setUpdatingFileId(null);
          setUpdatedFileName("");
        }

        console.log("File name updated successfully.");
      } else {
        console.error("Failed to update file name:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating file name:", error);
    }
  };

  return (
    <React.Fragment>
      <FileUpload AddFiles={AddFiles} folderId={folderId} />
      <div className="file-container">
        <h2 className="folder-title">{folderName}</h2>
        <div className="file-list">
          {files.map((file) => (
            <div key={file._id} className="file-item">
              {updatingFileId === file._id ? (
                <div>
                  <input
                    type="text"
                    value={updatedFileName}
                    onChange={(e) => setUpdatedFileName(e.target.value)}
                  />
                  <button
                    onClick={() => UpdateFileName(file._id, updatedFileName)}>
                    Save
                  </button>
                </div>
              ) : (
                <React.Fragment>
                  <span className="file-name">{file.name}</span>
                  <div className="file-buttons">
                    <label className="file-type">{file.type}</label>
                    <button
                      className="update-button"
                      onClick={() => {
                        setUpdatingFileId(file._id);
                        setUpdatedFileName(file.name);
                      }}>
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => DeleteFiles(e, file._id)}>
                      Delete
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default File;
