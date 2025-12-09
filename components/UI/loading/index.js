"use client";

import { useSelector } from "react-redux";

export function Loading() {
  return <div>Loading Layout...</div>;
}

export function LoadingMain({ children }) {
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <div className="main">
      {isLoading ? (
        <div className=" text-center p-10">Loading...</div>
      ) : (
        children
      )}
    </div>
  );
}
