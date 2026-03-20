import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  isLogin: false,
  user: null,
  location: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveLoginUserData(state, action) {
      state.user = action.payload.user;
      state.isLogin = true;
      state.accessToken = action.payload.token;
    },
    updateUser(state, action) {
      state.user = action.payload?.user;
    },
    signOutRequest(state) {
      state.accessToken = "";
      state.isLogin = false;
      state.user = null;
      state.location = null;
    },
    saveSelectedLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const {
  saveLoginUserData,
  signOutRequest,
  updateUser,
  saveSelectedLocation,
} = authSlice.actions;

export default authSlice.reducer;
