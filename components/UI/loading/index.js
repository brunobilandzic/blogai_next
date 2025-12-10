"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../popups";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { LoadingContext } from "@/lib/store/context/loadingContext";

export function LoadingMain({ children }) {
  const { isLoading, generationTime, message } = useSelector(
    (state) => state.loading
  );
  const { onStop } = useContext(LoadingContext);
  const [percentage, setPercentage] = useState(0);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isLoading && generationTime > 0) {
      const begin = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - begin;
        const newPercentage = Math.min(
          100,
          Math.floor((elapsed / generationTime) * 100)
        );
        setPercentage(newPercentage);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setPercentage(0);
    }
  }, [isLoading]);
  return (
    <div className="main">
      {isLoading ? (
        <LoadingModal
          loading={{ isLoading, generationTime, message }}
          percentage={percentage}
          onCancel={onStop ?? (() => {})}
        />
      ) : (
        children
      )}
    </div>
  );
}

export function LoadingModal({ loading, percentage, onCancel }) {
  const { isLoading, message } = loading;
  return (
    <Popup
      isOpen={isLoading}
      title={message}
      onCancel={onCancel}
      footer={<LoadingModalFooter onCancel={onCancel} />}
    >
      <div className="flex flex-col justify-center items-center">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        <div className="mt-4">{percentage}%</div>
      </div>
    </Popup>
  );
}

const LoadingModalFooter = ({ onCancel }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="btn btn-danger" onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
};
