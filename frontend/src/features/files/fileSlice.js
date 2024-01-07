import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles(state, action) {
      state.files = action.payload;
    },
    addFile(state, action) {
      state.files.push(action.payload);
    },
    deleteFile(state, action) {
      state.files = state.files.filter((item) => item._id !== action.payload);
    },
    updateFile(state, action) {
      const file = state.files.find(
        (item) => item._id === action.payload.fileId
      );

      file.name = action.payload.newName;
    },
    clearFile(state) {
      state.files = [];
    },
  },
});

export const { setFiles, addFile, deleteFile, updateFile, clearFile } =
  fileSlice.actions;
export default fileSlice.reducer;
