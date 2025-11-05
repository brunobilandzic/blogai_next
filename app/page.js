"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import { sessionAppUserClient } from "./utils/auth";

const deleteDb = async () => {
  const res = await axios.delete("/api/admin/deleteDb");
  console.log(res.data);
};

export default function Home() {
  const { user } = sessionAppUserClient();

  return (
    <div style={{}}>
      <h1 className="text-4xl font-bold mb-4">Secure your website</h1>

      <p className="text-xl mb-4">
        Protect your website from threats with our comprehensive security
        solutions.
      </p>
      <button className="btn mb-3" onClick={() => deleteDb()}>
        Delete Database
      </button>
      {user ? (
        <div>
          <span className="font-bold mr-4">{user.name}</span>
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
          <Link href="/dashboard" className="ml-4">
            <button className="btn">Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn()} className="btn">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
