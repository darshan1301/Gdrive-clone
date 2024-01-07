import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folder: [],
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders(state, action) {
      state.folder = action.payload;
    },
    deleteFolder(state, action) {
      state.folder = state.folder.filter((item) => item._id !== action.payload);
    },
    addFolder(state, action) {
      state.folder.push(action.payload);
    },
    clearFolder(state, action) {
      state.folder = [];
    },
  },
});

export const { setFolders, addFolder, deleteFolder, clearFolder } =
  folderSlice.actions;
export default folderSlice.reducer;
