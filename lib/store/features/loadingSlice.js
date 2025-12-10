import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  generationTime: 0,
  message: "",
  controller: null,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const values = action.payload;
      state.isLoading = values.isLoading;
      state.generationTime = values.generationTime;
      state.message = values.message;
      state.controller = values.controller || null;
    },
    offLoading: () => initialState,
  },
});

export const { setLoading, offLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

export const TYPES = {
  GENERATE_BLOG: "GENERATE_BLOG",
};
