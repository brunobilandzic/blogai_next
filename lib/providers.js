"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { AppUserProvider } from "@/app/utils/auth";

export default function Providers({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <ReduxProvider store={store}>
        <AppUserProvider>{children}</AppUserProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
