import { createSlice } from "@reduxjs/toolkit";
import { getUserRoleRedux } from "./helpers";
import { USER_ROLE } from "@/lib/constants";

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
    deductCredits: (state, action) => {
      const { remainingCredits } = action.payload;
      const role = getUserRoleRedux(state);

      if (!role) {
        console.warn("No USER_ROLE found in state.roles");
        return;
      }

      if (!role) {
        console.warn("Found USER_ROLE but .role is missing");
        return;
      }

      role.credits = remainingCredits;
    },
    setPreferredRole: (state, action) => {
      state.preferredRole = action.payload;
    },
    deletePreferredRole: (state) => {
      state.preferredRole = null;
    },
  },
});

export const {
  setAppUser,
  deleteAppUser,
  setPreferredRole,
  deletePreferredRole,
  deductCredits,
} = appUserSlice.actions;
export default appUserSlice.reducer;
