import { auth } from "@/lib/auth";
import { AppUser, User, Admin } from "@/models/User";
import dbConnect from "../db/mongooseConnect";

export const sessionAppUserServer = async () => {
  await dbConnect();
  const session = await auth();
  const email = session?.user?.email;
  const appUser = await AppUser.findOne({ email }).populate("roles.role");
  
  return {
    session,
    appUser,
  };
};

export async function getOrSaveUser(email) {
  await dbConnect();

  // username to create create AppUser
  const username = email.split("@")[0];
  let appUser;

  appUser = await AppUser.findOne({ username });

  if (appUser) {
    console.log("User found:", appUser);
  }

  if (!appUser) {
    if (username == "bruno.bilandzic2") {
      console.log("Special admin user detected.");
      appUser = new AppUser({ email, username });
      const admin = new Admin({ appUser: appUser._id, deleteDbCalls: 0 });
      const user = new User({ appUser: appUser._id, credits: 0 });
      await user.save();
      await admin.save();
      appUser.roles.push({ roleName: "Admin", role: admin._id });
      appUser.roles.push({ roleName: "User", role: user._id });
      await appUser.save();
      console.log("New admin user created:", appUser);
      return true;
    }
    console.log("User not found, creating new user.");
    appUser = new AppUser({ email, username });

    const user = new User({ appUser: appUser._id, credits: 0 });
    await user.save();

    appUser.roles.push({ roleName: "User", roleId: user._id });

    await appUser.save();
    console.log("New user created:", user);
    console.log("New appUser created:", appUser);
  }
  console.log("getOrSaveUser completed for username:", appUser?.username);

  if (appUser) return true;
  else return false;
}
