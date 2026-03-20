"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDrawerOpen: false, productData: null, cmsData: null };

const commonSlice = createSlice({
  name: "commonReducer",
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setTheProductData: (state, action) => {
      state.productData = action.payload;
    },
    clearProductData: (state) => {
      state.productData = null;
    },
    setCmsData: (state, action) => {
      state.cmsData = action.payload;
    },
  },
});

export const {
  setDrawerOpen,
  setTheProductData,
  clearProductData,
  setCmsData,
} = commonSlice.actions;

export default commonSlice.reducer;
