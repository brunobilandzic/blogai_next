"use client";

import { useSelector } from "react-redux";
import { NewParametersDashboardTile } from "../blog/parameters/Parameters";
import CreditsDashboardTile from "../credits";
import { PageItem } from "../UI/page/elements";
import Link from "next/link";
import { USER_ROLE } from "@/lib/constants";
import { getUserRoleClient } from "@/lib/actions/userClient";

// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function Dashboard() {
  const { roles, preferredRole } = useSelector((state) => state.appUserInfo);

  console.log("preferredRole:", preferredRole);
  if (preferredRole === "AdminRole") {
    userRole = null;
  }

  let userRole = roles
    ? roles.find((role) => role.roleName === preferredRole)?.role
    : null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <NewParametersDashboardTile />

        <PageItem>
          <Link href="/blog/parameters">
            <div className="tile-title">View all created parameters</div>
          </Link>
        </PageItem>

        {preferredRole == USER_ROLE && (
          <>
            <CreditsDashboardTile credits={userRole?.credits} />
          </>
        )}
      </div>
    </div>
  );
}

const UserRoleDashboard = ({ userRole }) => {};
