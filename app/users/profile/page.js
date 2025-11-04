import { authOptions } from "@/auth";
import dbConnect from "@/lib/mongooseConnect";
import { AppUser } from "@/models/User";
import { getSession } from "next-auth";
import React from "react";

const Profile = async () => {
  await dbConnect();
  const session = await getSession(authOptions);
  const user = session?.user;
  const appUser = await AppUser.findOne({ email: user?.email });
  console.log("Profile session user:", user);
  console.log("Profile appUser:", appUser);
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {appUser?.name}</p>
      <p>Email: {appUser?.email}</p>
    </div>
  );
};

export default Profile;
