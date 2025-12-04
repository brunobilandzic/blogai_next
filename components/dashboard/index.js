"use client";

import { useSelector } from "react-redux";
import {
  NewParametersDashboardTile,
  ViewAllParametersTile,
} from "../blog/parameters";
import { CreditsDashboardTile } from "../credits";
import { AllBlogsDashboardTile } from "../blog/blog";
import { PlaceHolderPageItems,  } from "@/components/UI/page/elements";
import { USER_ROLE } from "@/lib/constants";

// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function Dashboard() {
  const { roles, preferredRole } = useSelector((state) => state.appUserInfo);

  let userRole = roles
    ? roles.find((role) => role.roleName === preferredRole)?.role
    : null;

  return (
    <>
      <div className="tiles-grid">
        {preferredRole === USER_ROLE ? (
          <UserRoleDashboard credits={userRole.credits} />
        ) : (
          <div>Other Role Dashboard</div>
        )}
        <PlaceHolderPageItems count={4} />
      </div>
    </>
  );
}

const UserRoleDashboard = ({ credits }) => {
  return (
    <>
      <AllBlogsDashboardTile />
      <NewParametersDashboardTile />
      <ViewAllParametersTile />
      <CreditsDashboardTile credits={credits} />
    </>
  );
};
