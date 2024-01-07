import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import folderSlice from "./features/folders/folderSlice";
import fileSlice from "./features/files/fileSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    folders: folderSlice,
    files: fileSlice,
  },
});

export default store;
