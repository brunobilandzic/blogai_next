import { AuthNav, UnauthNav } from "./navauth";
import Link from "next/link";
import { sessionAppUserServer } from "@/lib/actions/user";

export const Navbar = async () => {
  const {  appUser } = await sessionAppUserServer();
  return (
    <>
      <div
        className="navbar bg-slate-300 p-4 flex justify-between items-center"
        color="info"
        position="static"
      >
        <Link href="/" className="font-bold text-xl">
          My App
        </Link>
        <div className="flex justify-end">
          {appUser ? <AuthNav username={appUser.username} /> : <UnauthNav />}
        </div>
      </div>
    </>
  );
};
