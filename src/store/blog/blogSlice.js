"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogReducer",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBlogsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlogsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearBlogs: (state) => {
      state.blogs = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setBlogs, setBlogsLoading, setBlogsError, clearBlogs } =
  blogSlice.actions;

export default blogSlice.reducer;
