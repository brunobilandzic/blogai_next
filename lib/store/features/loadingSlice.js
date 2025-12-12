import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  generationTime: 0,
  message: "",
  earlyRequest: false,
  percentage: 0,
};

export const testLoadingState = {
  isLoading: true,
  generationTime: 10000,
  message: "Testing loading...",
  earlyRequest: false,
  percentage: 0,
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
      state.earlyRequest = values.earlyRequest;
      state.percentage = values.percentage;
    },
    offLoading: () => initialState,
    setEarlyRequest: (state, action) => {
      state.earlyRequest = action.payload;
    },
    setPercentage: (state, action) => {
      if (action.payload > 100) {
        state.percentage = 100;
        return;
      }
      state.percentage = action.payload;
    },
    incrementPercentage: (state, action) => {
      if (state.percentage + action.payload > 100) {
        state.percentage = 100;
        return;
      }
      state.percentage += action.payload;
    },
  },
});

export const {
  setLoading,
  offLoading,
  setEarlyRequest,
  setPercentage,
  incrementPercentage,
} = loadingSlice.actions;
export default loadingSlice.reducer;

export const TYPES = {
  GENERATE_BLOG: "GENERATE_BLOG",
};
