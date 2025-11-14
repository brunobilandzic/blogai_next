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
