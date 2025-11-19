"use client";

import { useSelector } from "react-redux";

export const getUserRoleClient = () => {
  const { roles } = useSelector((state) => state.appUserInfo);
  if (!roles) return null;

  const userRole = roles.find((role) => role.roleName === "UserRole")?.role;
  if (!userRole) return null;

  return userRole;
};
