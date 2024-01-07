const base_url = "http://localhost:8000";

/////////GET FOLDER
export const getFolderHandler = async (headers) => {
  try {
    const response = await fetch(`${base_url}/folder`, {
      method: "GET",
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

///////ADD FOLDER
export const addFolderHandler = async (jwtToken, formInputs) => {
  try {
    const response = await fetch(`${base_url}/folder/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ foldername: formInputs }),
    });

    return response;
  } catch (error) {
    console.error("Error adding folder:", error);
  }
};

//////////////////DELETE FOLDER
export const deleteFolderHandler = async (headers, folderId) => {
  try {
    const response = await fetch(`${base_url}/folder/delete/${folderId}`, {
      method: "DELETE",
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log("error deleting folder:", error);
  }
};
