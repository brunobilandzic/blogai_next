// components/navbar/auth.js
// all navbar elements related to authentication status
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

export const AuthNav = ({ image }) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <span className="hover:cursor-pointer font-bold">
          <Link href="/users/profile">
            <img
              src={image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </Link>
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
};

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
