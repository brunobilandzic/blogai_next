"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppUser,
  deleteAppUser,
  setPreferredRole,
} from "@/lib/store/features/appUserSlice";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { USER_ROLE } from "./constants";
import { LoadingContext } from "./store/context/loadingContext";

export default function Providers({ children }) {
  const [onStop, setOnStop] = useState(() => {});
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <LoadingContext.Provider value={{ onStop, setOnStop }}>
        <ReduxProvider store={store}>
          <AppUserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              {children}
            </ThemeProvider>
          </AppUserProvider>
        </ReduxProvider>
      </LoadingContext.Provider>
    </SessionProvider>
  );
}

export const setAppUserFromApi = async (dispatch) => {
  console.log("Fetching app user from API...");
  const res = await fetch("/api/auth/user");
  if (res.ok) {
    const resData = await res.json();

    const rolesInfo = resData?.appUser?.roles || [];

    delete resData.appUser.roles;

    dispatch(
      setAppUser({
        appUser: resData.appUser,
        roles: rolesInfo,
      })
    );
    dispatch(setPreferredRole(USER_ROLE));
  } else {
    dispatch(deleteAppUser());
  }
};

const AppUserProvider = ({ children }) => {
  const user = useSelector((state) => state.appUserInfo?.appUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) setAppUserFromApi(dispatch);
  }, []);

  return children;
};
