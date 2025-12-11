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
import store from "@/lib/store/store";

export function LoadingMain({ children }) {
  const { isLoading, generationTime, message, earlyRequest, percentage } =
    useSelector((state) => state.loading);
  const { onStop } = useContext(LoadingContext);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      console.log("LoadingMain: isLoading true");
      const begin = Date.now();
      if (earlyRequest) {
        console.log("LoadingMain: earlyRequest true, starting interval");

        const step = 15;
        intervalRef.current = setInterval(() => {
          console.log("LoadingMain: early request interval tick", percentage);

          if (percentage < 90) {
            console.log(
              "LoadingMain: increasing percentage by step",
              percentage,
              step
            );
            dispatch(setPercentage(percentage + step));
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            dispatch(setEarlyRequest(false));
            dispatch(offLoading());
          }
        }, 1000);
      } else {
        intervalRef.current = setInterval(() => {
          const now = Date.now();
          /*         setElapsed(now - begin); */
          const elapsed = now - begin;
          const newPercentage = Math.min(
            99,
            Math.floor((elapsed / generationTime) * 100)
          );
          dispatch(setPercentage(newPercentage));
        }, 1000);
      }
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

export const waitForLoading = (state) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const state = store.getState();
      const earlyRequest = state.loading.earlyRequest;
      if (!earlyRequest) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
};
