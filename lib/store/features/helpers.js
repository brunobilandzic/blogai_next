import { USER_ROLE } from "../../constants";

export const getUserRoleRedux = (state) => {
  return state?.roles?.find((role) => role.roleName === USER_ROLE)?.role || null;
};

export const getRemainingCredits = (state) => {
  const userRole = state.appUserInfo.roles
    ? state.appUserInfo.roles.find((role) => role.roleName === USER_ROLE)?.role
    : null;
  return userRole ? userRole.credits : 0;
};