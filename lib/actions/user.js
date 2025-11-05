import { auth } from "@/auth";
import { AppUser } from "@/models/User";

export const sessionAppUserServer = async () => {
  const session = await auth();
  const email = session?.user?.email;
  const appUser = await AppUser.findOne({ email });
  return {
    session,
    appUser,
  };
};
