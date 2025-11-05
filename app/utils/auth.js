"use client";

import { useDispatch, useSelector } from "react-redux";
import { setAppUser, deleteAppUser } from "@/lib/store/features/appUserSlice";
import { useEffect } from "react";

export const setAppUserFromApi = async (dispatch) => {
  console.log("Fetching app user from API...");
  const res = await fetch("/api/auth/user");
  if (res.ok) {
    
    const resData = await res.json();
    console.log("Fetched app user data:", resData);

    const rolesInfo = resData?.appUser?.roles || [];
    console.log("Roles info fetched:", rolesInfo);

    delete resData.appUser.roles;
    console.log("AppUser data without roles:", resData.appUser);

    dispatch(
      setAppUser({
        appUser: resData.appUser,
        roles: rolesInfo,
      })
    );
  } else {
    dispatch(deleteAppUser());
  }
};

export const AppUserProvider = ({ children }) => {
  const user = useSelector((state) => state.appUserInfo?.appUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) setAppUserFromApi(dispatch);
  }, []);

  return children;
};
