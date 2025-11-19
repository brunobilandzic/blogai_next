import { createSlice } from "@reduxjs/toolkit";
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
    updateCredits: (state, action) => {
      const { remainingCredits } = action.payload;
      const userRole = state.roles.find(
        (role) => role.roleName === USER_ROLE
      )?.role;
      if (userRole) {
        console.log("Updating userRole credits to:", remainingCredits);
        userRole.credits = remainingCredits;
      }
    },
    setPreferredRole: (state, action) => {
      state.preferredRole = action.payload;
    },
    deletePreferredRole: (state) => {
      state.preferredRole = null;
    },
  },
});

export const getRemainingCredits = (state) => {
  const userRole = state.appUserInfo.roles
    ? state.appUserInfo.roles.find((role) => role.roleName === USER_ROLE)?.role
    : null;
  return userRole ? userRole.credits : 0;
}

export const {
  setAppUser,
  deleteAppUser,
  setPreferredRole,
  deletePreferredRole,
  updateCredits
} = appUserSlice.actions;
export default appUserSlice.reducer;
