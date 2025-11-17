"use client";

import { useSelector } from "react-redux";
import { PrametersDashboardTile } from "../blog/parameters/Parameters";
import CreditsDashboardTile from "../credits";

// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function Dashboard() {
  const { appUser, roles, preferredRole } = useSelector(
    (state) => state.appUserInfo
  );
  let userRole = roles?.find((role) => role.roleName === "UserRole")?.role;
  console.log("preferredRole:", preferredRole);
  if (preferredRole === "AdminRole") {
    userRole = null;
  }
  return (
    <div>
      <p className="mb-4">Welcome, {appUser?.username}!</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <PrametersDashboardTile appUser={appUser} />
        {userRole && <CreditsDashboardTile credits={userRole?.credits} />}
      </div>
    </div>
  );
}
