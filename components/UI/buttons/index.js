// components/UI/buttons/main.js

"use client";

import {
  deletePreferredRole,
  setPreferredRole,
} from "@/lib/store/features/appUserSlice";
import { useDispatch, useSelector } from "react-redux";

export const ChoosePreferedRole = ({ roleNames }) => {
  const dispatch = useDispatch();
  const preferredRole = useSelector((state) => state.appUserInfo.preferredRole);
  console.log("Preferred role from store:", preferredRole);
  console.log("setPreferredRole typeof:", typeof setPreferredRole);
  console.log("deletePreferredRole typeof:", typeof deletePreferredRole);
  console.log("setPreferredRole.type:", setPreferredRole?.type);
  console.log("deletePreferredRole.type:", deletePreferredRole?.type);
  return (
    <div className="nav-item flex flex-col md:flex-row gap-2">
      {roleNames.map((roleName) => (
        <div key={roleName}>
          <button
            onClick={() => dispatch(setPreferredRole(roleName))}
            className={`${preferredRole === roleName ? "font-bold" : ""}`}
          >
            {roleName}
          </button>
        </div>
      ))}
      <div>
        <button
          onClick={() => dispatch(deletePreferredRole())}
          className={``}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
