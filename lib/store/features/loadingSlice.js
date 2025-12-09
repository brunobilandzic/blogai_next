import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  generationTime: 0,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { type, ...values } = action.payload;
      switch (type) {
        case TYPES.GENERATE_BLOG:
          state.isLoading = values.isLoading;
          state.generationTime = BLOG_GENERATION_TIME;
          break;
        default:
          state.isLoading = values.isLoading;
          break;
      }
    },
    offLoading: () => initialState,
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

export const TYPES = {
  GENERATE_BLOG: "GENERATE_BLOG",
};

const BLOG_GENERATION_TIME = 55000; // in milliseconds
