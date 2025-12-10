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
  const { isLoading, generationTime, controller, message } = useSelector(
    (state) => state.loading
  );
  const [percentage, setPercentage] = useState(0);
  const [timer, setTimer] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && generationTime > 0 && controller) {
      const begin = Date.now();
      setTimer(
        setInterval(() => {
          const now = Date.now();
          const elapsed = now - begin;
          const newPercentage = Math.min(
            100,
            Math.floor((elapsed / generationTime) * 100)
          );
          setPercentage(newPercentage);
        }, 1000)
      );
    } else {
      clearInterval(timer);
    }
  }, [isLoading]);

  const onCancel = () => {
    if (controller) controller.abort();
    dispatch(offLoading());
    router.refresh();
  };

  return (
    <div className="main">
      {isLoading ? (
        <LoadingModal
          loading={{ isLoading, generationTime, message }}
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
