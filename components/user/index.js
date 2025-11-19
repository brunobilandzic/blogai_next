"use client";

import { getUserRoleClient } from "@/lib/actions/userClient";
import Link from "next/link";

export default async function ProfilePage({ appUser }) {
  const userRole = await getUserRoleClient();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h1>Profile</h1>
        <p>Username: {appUser?.username}</p>
        <p>Email: {appUser?.email}</p>
      </div>
      <div>
        {userRole ? (
          <div>
            <h2>User Role</h2>
            <p>Remaining Credits: {userRole.credits}</p>
            <Link href="/blog/parameters">You have {userRole.blogParameters.length} blog parameters</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
