"use client";

// components/navbar/main.js
// Navbar component that displays navigation links based on authentication status
import { useSelector } from "react-redux";
import { AuthNav, UnauthNav } from "./auth";
import { useEffect, useState } from "react";
import NavItems, { CommonNavItems, NavItem } from "./navItemsMap";
import "./navbar.css";
import { useSession } from "next-auth/react";
import { appName } from "@/lib/utils";

export const Navbar = () => {
  const { appUser, roles } = useSelector((state) => state.appUserInfo);
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useSession().data?.user;
  console.log(22);
  console.log("Navbar appUser from Redux:", user);
  return (
    <div
      className={`navbar bg-slate-300 p-4 flex justify-between  w-full ${
        isExpanded ? "items-start" : "items-center"
      }`}
      color="info"
      position="static"
    >
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="text-xl">
          <div className="hidden md:block">
            <NavItem href="/" label={appName} className="font-bold" />
          </div>
          <div className="md:hidden">
            <NavItem
              label={appName}
              className="font-bold"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
        <div className="items-center gap-2 hidden md:flex">
          {roles ? <NavItems roles={roles} /> : <CommonNavItems />}
        </div>
        {isExpanded && (
          <div className="flex flex-col mt-2 gap-2">
            {roles ? (
              <NavItems className="text-yellow-600" roles={roles} />
            ) : (
              <CommonNavItems />
            )}
          </div>
        )}
      </div>
      <div className={`flex items-center gap-4 `}>
        {user ? <AuthNav image={user?.image} /> : <UnauthNav />}
      </div>
    </div>
  );
};
