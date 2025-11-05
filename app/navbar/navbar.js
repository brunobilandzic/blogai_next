"use client";

import { AuthNav, UnauthNav } from "./navauth";
import Link from "next/link";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const appUser = useSelector((state) => state.appUserInfo?.appUser);

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
