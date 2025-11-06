"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { signIn, signOut } from "next-auth/react";

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



export const AuthNav = ({ username }) => (
  <div className="flex items-center">
    <div className="mr-4">
      Hello,{" "}
      <span className="hover:cursor-pointer font-bold">
        <Link href="/users/profile">{username}</Link>
      </span>
    </div>
    <button
      className="font-semibold hover:text-gray-50"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  </div>
);

export const UnauthNav = () => (
  <div>
    <button
      className="font-semibold hover:text-gray-50"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  </div>
);