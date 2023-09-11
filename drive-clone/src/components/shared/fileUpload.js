import React from 'react';
import "./fileUpload.css";

export default function FileUpload({AddFiles, folderId}){
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("folderId", folderId);

    AddFiles(formData);
  }
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