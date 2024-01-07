import React from "react";
import "./fileUpload.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../authContext/AuthContext";
import { addFileHandler } from "../../services/file.services";
import { addFile } from "./fileSlice";

export default function FileUpload({ folderId }) {
  const dispatch = useDispatch();
  const { jwtToken } = useAuth();

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("folderId", folderId);

    const response = await addFileHandler(headers, formData);

    console.log(response);

    if (response.ok) {
      const newData = await response.json();
      console.log(newData);
      dispatch(addFile(newData.file));
    } else {
      console.error("add file failed:", response.statusText);
    }

    // AddFiles(formData);
  };
  return (
    <div className="postform">
      <form id="postForm" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="upload-section">
          <label htmlFor="mediaInput" className="upload-label">
            Upload Media (PDF, Excel, Image, Doc)
          </label>
          <input
            type="file"
            accept=".pdf, .xls, .xlsx, .doc, .docx, image/*"
            id="mediaInput"
            name="mediaFile"
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
