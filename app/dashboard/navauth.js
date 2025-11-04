"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

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
