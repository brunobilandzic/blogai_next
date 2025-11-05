import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  appUser: null,
};

export const appUserSlice = createSlice({
  name: "appUserInfo",
  initialState,
  reducers: {
    setAppUser: (state, action) => {
      state.appUser = action.payload;
    },
    deleteAppUser: (state) => {
      state.appUser = null;
    },
  },
});

export const { setAppUser, deleteAppUser } = appUserSlice.actions;
export default appUserSlice.reducer;
