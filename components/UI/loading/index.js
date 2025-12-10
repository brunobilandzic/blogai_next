"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../popups";

export function Loading() {
  return <div>Loading Layout...</div>;
}

export function LoadingMain({ children }) {
  const loading = useSelector((state) => state.loading);
  const [percentage, setPercentage] = useState(0);
  const [timer, setTimer] = useState(null);
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

  return (
    <div className="main">
      {loading.isLoading ? <LoadingModal /> : children}
    </div>
  );
}

export function LoadingModal({ loading }) {
  const { isLoading, generationTime, message } = loading;
  return <Popup isOpen={isLoading}></Popup>;
}
