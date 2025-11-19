"use client";

import { useSelector } from "react-redux";
import {
  NewParametersDashboardTile,
  ViewAllParametersTile,
} from "../blog/parameters";
import {CreditsDashboardTile} from "../credits";
import { AllBlogsDashboardTile } from "../blog/blog";
import { USER_ROLE } from "@/lib/constants";

// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function Dashboard() {
  const { roles, preferredRole } = useSelector((state) => state.appUserInfo);

  let userRole = roles
    ? roles.find((role) => role.roleName === USER_ROLE)?.role
    : null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {preferredRole === USER_ROLE ? (
          <UserRoleDashboard credits={userRole.credits} />
        ) : (
          <div>Other Role Dashboard</div>
        )}
      </div>
    </div>
  );
}

const UserRoleDashboard = ({ credits }) => {
  console.log("Rendering UserRoleDashboard with credits:", credits);
  return (
    <>
      <AllBlogsDashboardTile />
      <NewParametersDashboardTile />
      <ViewAllParametersTile />
      <CreditsDashboardTile credits={credits} />
    </>
  );
};
