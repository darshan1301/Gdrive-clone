import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    setError(state, action) {
      state.error = action.payload;
    },
    clearUser(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
