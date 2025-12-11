"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  offLoading,
  setEarlyRequest,
  setPercentage,
} from "@/lib/store/features/loadingSlice";
import Popup from "../popups";
import { ClipLoader } from "react-spinners";
import { LoadingContext } from "@/lib/store/context/loadingContext";

export function LoadingMain({ children }) {
  const { isLoading, generationTime, message, earlyRequest, percentage } =
    useSelector((state) => state.loading);
  const { onStop, setOnStop } = useContext(LoadingContext);
  const intervalRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      console.log("generationTime", generationTime);
      const begin = Date.now();
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        /*         setElapsed(now - begin); */
        const elapsed = now - begin;
        console.log("now begin diff", now - begin);
        console.log("elapsed", elapsed);
        const newPercentage = Math.min(
          99,
          Math.floor((elapsed / generationTime) * 100)
        );
        console.log("newPercentage", newPercentage);
        dispatch(setPercentage(newPercentage));
      }, 1000);
    } else if (earlyRequest) {
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      dispatch(setEarlyRequest(false));
      dispatch(offLoading());
    }
  }, [isLoading, earlyRequest]);
  return (
    <div className="main">
      {isLoading ? (
        <LoadingModal
          loading={{ isLoading, generationTime, message, percentage }}
          onCancel={onStop ?? (() => {})}
        />
      ) : (
        children
      )}
    </div>
  );
}

export function LoadingModal({ loading, onCancel }) {
  const { isLoading, message, percentage } = loading;
  useEffect(() => {
    console.log(percentage);
  }, [percentage]);
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

export const waitForLoading = (timeElapsed, generationTime, setPercentage) => {
  return new Promise((resolve) => {
    if (timeElapsed >= generationTime) {
      resolve();
      return;
    }
    const step = (100 - (timeElapsed / generationTime) * 100) / 10;
    
    if (step <= 0) {
      resolve();
      return;
    }
    const interval = setInterval(() => {
      setPercentage((prev) => {
        console.log("step", step);
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          resolve();
          return 100;
        }
        return next;
      });
    }, 100);
  });
};
