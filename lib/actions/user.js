import { auth } from "@/auth";
import { AppUser } from "@/models/User";
import dbConnect from "../mongooseConnect";

export const sessionAppUserServer = async () => {
  await dbConnect();
  const session = await auth();
  const email = session?.user?.email;
  const appUser = await AppUser.findOne({ email });
  return {
    session,
    appUser,
  };
};
