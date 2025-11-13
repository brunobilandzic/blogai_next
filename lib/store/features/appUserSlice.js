import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  appUser: null,
  roles: null,
  preferredRole: null,
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
    setPreferredRole: (state, action) => {
      state.preferredRole = action.payload;
    },
    deletePreferredRole: (state) => {
      state.preferredRole = null;
    },
  },
});

export const { setAppUser, deleteAppUser, setPreferredRole, deletePreferredRole } =
  appUserSlice.actions;
export default appUserSlice.reducer;
