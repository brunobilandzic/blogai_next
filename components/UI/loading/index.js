"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../popups";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { offLoading } from "@/lib/store/features/loadingSlice";

export function Loading() {
  return <div>Loading Layout...</div>;
}

export function LoadingMain({ children }) {
  const loading = useSelector((state) => state.loading);
  const [percentage, setPercentage] = useState(0);
  const [timer, setTimer] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (loading.isLoading && loading.generationTime > 0) {
      const begin = Date.now();
      setTimer(
        setInterval(() => {
          const now = Date.now();
          const elapsed = now - begin;
          const newPercentage = Math.min(
            100,
            Math.floor((elapsed / loading.generationTime) * 100)
          );
          console.log(begin, now, elapsed, newPercentage);
          setPercentage(newPercentage);
        }, 1000)
      );
    } else {
      clearInterval(timer);
    }
  }, [loading.isLoading]);

  const onCancel = () => {
    dispatch(offLoading());
    router.refresh();
  };

  return (
    <div className="main">
      {loading.isLoading ? (
        <LoadingModal
          loading={loading}
          percentage={percentage}
          onCancel={onCancel}
        />
      ) : (
        children
      )}
    </div>
  );
}

export function LoadingModal({ loading, percentage, onCancel }) {
  const { isLoading, generationTime, message } = loading;
  return (
    <Popup
      isOpen={isLoading}
      title={message}
      onCancel={onCancel}
      footer={LoadingModalFooter(onCancel)}
    >
      <div className="flex flex-col justify-center items-center">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        <div className="mt-4">{percentage}%</div>
      </div>
    </Popup>
  );
}

const LoadingModalFooter = (onCancel) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="btn btn-danger" onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
};
