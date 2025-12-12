"use client";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function LoadingClient({ children }) {
  const clientLoading = useSelector((state) => state.loading.clientLoading);

  return clientLoading ? (
    <div className="fixed inset-0  z-50 flex items-center justify-center">
      <div className="loader">
        <ClipLoader size={50} color={"#123abc"} loading={clientLoading} />
      </div>
    </div>
  ) : (
    children
  );
}
