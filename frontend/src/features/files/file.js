import React, { useState, useEffect } from "react";
import "./file.css";
import FileUpload from "../files/fileUpload";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFileHandler,
  getFilesHandler,
  updateFileHandler,
} from "../../services/file.services";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, setFiles, updateFile } from "./fileSlice";
import BackButton from "../../components/ui/backButton";

const File = () => {
  const files = useSelector((state) => state.files.files);
  const [updatingFileId, setUpdatingFileId] = useState(null);
  const [updatedFileName, setUpdatedFileName] = useState("");
  const dispatch = useDispatch();

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
      const response = await getFilesHandler(headers, folderId);
      const data = await response.json();
      dispatch(setFiles(data.files));
    } else {
      navigate("/");
    }
  };

  const DeleteFiles = async (e, fileId) => {
    e.preventDefault();

    const response = await deleteFileHandler(headers, fileId);
    if (response.ok) {
      console.log("file deleted successfully");
      dispatch(deleteFile(fileId));
    }
  };

  const UpdateFileName = async (fileId, newName) => {
    const response = await updateFileHandler(jwtToken, fileId, newName);

    if (response.ok) {
      dispatch(updateFile({ fileId, newName }));
      setUpdatingFileId(null);
      setUpdatedFileName("");

      console.log("File name updated successfully.");
    } else {
      console.error("Failed to update file name:", response.statusText);
    }
  };

  return (
    <React.Fragment>
      <FileUpload folderId={folderId} />
      <div className="file-container">
        <div className="fileHeader">
          <h2 className="folder-title">{folderName}</h2>
          <BackButton />
        </div>
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
