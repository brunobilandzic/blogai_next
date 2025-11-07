import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  appUser: null,
  roles: null,
};

export const appUserSlice = createSlice({
  name: "appUserInfo",
  initialState,
  reducers: {
    setAppUser: (state, action) => {
      state.appUser = action.payload.appUser;
      state.roles = action.payload.roles;
    },
    deleteAppUser: (state) => {
      state = initialState;
    },
  },
});

export const { setAppUser, deleteAppUser } = appUserSlice.actions;
export default appUserSlice.reducer;
