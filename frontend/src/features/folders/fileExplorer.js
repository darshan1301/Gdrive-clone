import React, { useEffect } from "react";
import "./fileExplorer.css";
import Folder from "./folder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/AuthContext";
import AddFolder from "./addFolder";
import { useDispatch, useSelector } from "react-redux";
import { setFolders } from "./folderSlice";
import { getFolderHandler } from "../../services/folder.services";

function FileExplorer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allFolders = useSelector((state) => state.folders.folder);

  const { jwtToken } = useAuth();

  useEffect(() => {
    onGetFolders();
  }, []);

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const onGetFolders = async () => {
    if (jwtToken) {
      const response = await getFolderHandler(headers);
      const data = await response.json();
      dispatch(setFolders(data.folders));
    } else {
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <div className="file-explorer">
        <h2>File Explorer</h2>
        <AddFolder />
        <div className="grid-container">
          {allFolders.map((folder) => (
            <Folder
              key={folder._id}
              folderId={folder._id}
              folderName={folder.name}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default FileExplorer;
