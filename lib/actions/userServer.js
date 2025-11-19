import { auth } from "@/lib/auth";
import { AppUser, UserRole, AdminRole } from "@/models/user/User";
import dbConnect from "../db/mongooseConnect";
import { UNAUTHENTICATED, UNAUTHORIZED, USER_ROLE } from "../constants";

export const sessionAppUserServer = async () => {
  await dbConnect();
  const session = await auth();
  const email = session?.user?.email;
  const appUser = await AppUser.findOne({ email }).populate({
    path: "roles.role",
  });

  return {
    session,
    appUser,
  };
};

export const sessionUserRoleServer = async () => {
  const { appUser } = await sessionAppUserServer();
  if (!appUser) return UNAUTHENTICATED;
  const userRole = getRoleObject(appUser, USER_ROLE);
  if (!userRole) return UNAUTHORIZED;
  return userRole;
};

export async function getOrSaveUser(email) {
  await dbConnect();

  // username to create create AppUser
  const username = email.split("@")[0];
  let appUser;

  appUser = await AppUser.findOne({ username });

  if (appUser) {
    console.log("User found:", appUser.username);
  }

  if (!appUser) {
    if (username == "bruno.bilandzic2") {
      console.log("Special admin user detected.");
      appUser = new AppUser({ email, username });
      const adminRole = new AdminRole({
        appUser: appUser._id,
        deleteDbCalls: 0,
      });
      const userRole = new UserRole({ appUser: appUser._id, credits: 1000 });
      await userRole.save();
      await adminRole.save();
      appUser.roles.push({ roleName: "AdminRole", role: adminRole._id });
      appUser.roles.push({ roleName: "UserRole", role: userRole._id });
      console.log("Admin role", adminRole);
      console.log("User role", userRole);
      await appUser.save();
      return true;
    }
    console.log("User not found, creating new user.");
    appUser = new AppUser({ email, username });

    const userRole = new UserRole({ appUser: appUser._id, credits: 0 });
    await userRole.save();

    appUser.roles.push({ roleName: "User", role: userRole._id });

    await appUser.save();
  }

  if (appUser) return true;
  else return false;
}

export const getRoleObject = (appUser, roleName) => {
  if (!appUser || !appUser.roles) return null;
  const roleEntry = appUser.roles.find((r) => r.roleName === roleName);
  return roleEntry ? roleEntry.role : null;
};
