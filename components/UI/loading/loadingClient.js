"use client";

import { chipClasses } from "@mui/material";
import { useSelector } from "react-redux";

export default function LoadingClient({ children }) {
  const clientLoading = useSelector((state) => state.loading.clientLoading);

  return clientLoading ? (
    <div className="fixed inset-0 bg-yellow-300 z-50 flex items-center justify-center">
      <div className="loader">Loading...</div>
    </div>
  ) : (
    children
  );
}
