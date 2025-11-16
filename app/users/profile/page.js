// app/users/profile/page.js

import { sessionAppUserServer } from "@/lib/actions/user";
import ProfilePage from "@/components/user";

import React from "react";

const Profile = async () => {
  const { appUser } = await sessionAppUserServer();
  console.log("AppUser in Profile page:", appUser);

  if (!appUser) {
    return <div>Please sign in to view your profile.</div>;
  }
  return (
    <div>
      <ProfilePage appUser={appUser} />
    </div>
  );
};

export default Profile;
