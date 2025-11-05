"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setAppUser, deleteAppUser } from "@/lib/store/features/appUserSlice";

export const sessionAppUserClient = async () => {
  const session = useSession();
  const res = await fetch("/api/auth/user");
  if (res.ok) {
    const appUser = await res.json();
    return {
      appUser,
      session,
    };
  } else {
    return null;
  }
};

export const setAppUserFromApi = () => {
  const user = useSelector((state) => state.appUser.appUserInfo);
  const dispatch = useDispatch();

  if (!user) {
    fetch("/api/auth/user")
      .then((res) =>{
        console.log("API response status redux:", res.status);
        return res.json()})
      .then((data) => {
        dispatch(setAppUser(data?.appUser));
      })
      .catch((err) => {
        console.error("Failed to fetch app user:", err);
        dispatch(deleteAppUser());
      });
  }
};

export const AppUserProvider = ({ children }) => {
  setAppUserFromApi();
  return children;
};
