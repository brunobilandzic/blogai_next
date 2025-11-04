import { AppBar, Button } from "@mui/material";
import { auth } from "@/auth";
import { AppUser } from "@/models/User";
import { AuthNav, UnauthNav } from "../dashboard/navauth";

export const Navbar = async () => {
  const session = await auth();
  const sessionUser = session?.user;
  const appUser = await AppUser.findOne({ email: sessionUser?.email });
  console.log("Navbar session user:", sessionUser);
  console.log("Navbar appUser:", appUser);  

  return (
    <>
      <div
        className="navbar bg-blue-500 text-white p-4 flex justify-between items-center"
        color="info"
        position="static"
      >
        <div className="font-bold text-xl">My App</div>
        <div className="flex justify-end">
          {appUser ? <AuthNav username={appUser.username} /> : <UnauthNav />}
        </div>
      </div>
    </>
  );
};
