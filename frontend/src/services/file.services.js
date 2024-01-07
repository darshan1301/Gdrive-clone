const base_url = "http://localhost:8000";

/////////////GET FIILES
export const getFilesHandler = async (headers, folderId) => {
  try {
    const response = await fetch(`${base_url}/file/${folderId}`, {
      method: "GET",
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/////////////////ADD FILE
export const addFileHandler = async (headers, formInputs) => {
  try {
    const response = await fetch(`${base_url}/file/`, {
      method: "POST",
      headers: headers,
      body: formInputs,
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

///////////////DELETE FILE
export const deleteFileHandler = async (headers, fileId) => {
  try {
    const response = await fetch(`${base_url}/file/${fileId}`, {
      method: "DELETE",
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};

////////////UPDATE FILE
export const updateFileHandler = async (jwtToken, fileId, newName) => {
  try {
    const response = await fetch(`${base_url}/file/${fileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ newName }),
    });

    return response;
  } catch (error) {
    console.error("Error updating file name:", error);
  }
};
