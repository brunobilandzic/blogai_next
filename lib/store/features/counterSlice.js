import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter22",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    deleteCounter: (state) => {
      state = initialState;
    },
  },
});

export const { increment, decrement, incrementByAmount, deleteCounter } = counterSlice.actions;
export default counterSlice.reducer;
