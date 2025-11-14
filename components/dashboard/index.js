"use client";

import { useSelector } from "react-redux";
import UserDashboard from "./user";

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
        <DashboardLink>
          <UserDashboard appUser={appUser} />
        </DashboardLink>
        <div>avnsdvnsw</div>
      </div>
    </div>
  );
}

const DashboardLink = ({ children }) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
      {children}
    </div>
  );
};
