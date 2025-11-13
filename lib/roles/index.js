export const getRoleObject = (appUser, roleName) => {
  if (!appUser || !appUser.roles) return null;
  const roleEntry = appUser.roles.find((r) => r.roleName === roleName);
  return roleEntry ? roleEntry.role : null;
};
