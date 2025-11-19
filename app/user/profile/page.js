// app/users/profile/page.js

import { sessionAppUserServer } from "@/lib/actions/userServer";
import ProfilePage from "@/components/user";


import React from "react";
import { NotLoggedInComponent } from "@/components/UI/errors/auth";
import clean from "@/lib/db/clean";

const Profile = async () => {
  const { appUser } = clean(await sessionAppUserServer());
  console.log("AppUser in Profile page:", appUser);

  if (!appUser) return <NotLoggedInComponent />;

  return (
    <div>
      <ProfilePage appUser={appUser} />
    </div>
  );
};

export default Profile;
