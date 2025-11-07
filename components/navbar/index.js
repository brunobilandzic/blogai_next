"use client";

// components/navbar/main.js
// Navbar component that displays navigation links based on authentication status
import { useSelector } from "react-redux";
import { AuthNav, UnauthNav } from "./auth";
import { useEffect } from "react";
import NavItems, { CommonNavItems, NavItem } from "./navItemsMap";

export const Navbar = () => {
  const { appUser, roles } = useSelector((state) => state.appUserInfo);

  return (
    <>
      <div
        className="navbar bg-slate-300 p-4 flex justify-between items-center"
        color="info"
        position="static"
      >
        <div className="flex gap-4">
          <div className="text-xl">
            <NavItem href="/" label="My App" className="font-bold" />
          </div>
          <div className="flex items-center gap-2 ">
            {roles ? <NavItems roles={roles} /> : <CommonNavItems />}
          </div>
        </div>
        <div className="flex justify-end">
          {appUser ? <AuthNav username={appUser.username} /> : <UnauthNav />}
        </div>
      </div>
      <div>{JSON.stringify({ appUser, roles })}</div>
    </>
  );
};
