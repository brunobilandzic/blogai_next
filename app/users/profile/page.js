// app/users/profile/page.js

import { sessionAppUserServer } from "@/lib/actions/user";

import React from "react";

const Profile = async () => {
  const { appUser } = await sessionAppUserServer();

  if (!appUser) {
    return <div>Please sign in to view your profile.</div>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {appUser?.username}</p>
      <p>Email: {appUser?.email}</p>
    </div>
  );
};

export default Profile;
