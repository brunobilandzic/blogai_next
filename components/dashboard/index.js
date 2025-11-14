"use client";

import { useSelector } from "react-redux";
import UserDashboard from "./user";
import { PageItem } from "../UI/page/elements";
// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function Dashboard() {
  const { appUser, roles, prefferedRole } = useSelector(
    (state) => state.appUserInfo
  );
  return (
    <div>
      <p className="mb-4">Welcome, {appUser?.username}!</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <PageItem>
          <UserDashboard appUser={appUser} />
        </PageItem>
        <PageItem>
          <div>avnsdvnsw</div>
        </PageItem>
      </div>
    </div>
  );
}
