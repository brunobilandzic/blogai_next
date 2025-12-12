"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementPercentage,
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
  const percentageRef = useRef(percentage);

  useEffect(() => {
    percentageRef.current = percentage;
  }, [percentage]);

  useEffect(() => {
    if (isLoading) {
      // if isloading true
      console.log("LoadingMain: isLoading true");
      const begin = Date.now();
      // if early request true, start interval to increase percentage by step until 90%
      if (earlyRequest) {
        intervalRef.current && clearInterval(intervalRef.current);
        console.log("LoadingMain: earlyRequest true, starting interval");

        const step = 15;
        intervalRef.current = setInterval(() => {
          const freshPercentage = percentageRef.current;

          if (freshPercentage < 99) {
            dispatch(setPercentage(freshPercentage + step));
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            dispatch(offLoading());
          }
        }, 1000);
      } else {
        console.log(
          "LoadingMain: earlyRequest false, starting generationTime interval"
        );
        intervalRef.current = setInterval(() => {
          const now = Date.now();
          /*         setElapsed(now - begin); */
          const elapsed = now - begin;
          console.log(
            `Generation time: ${generationTime}, elapsed: ${elapsed}, ratio: ${
              elapsed / generationTime
            }`
          );
          const newPercentage = Math.min(
            99,
            Math.floor((elapsed / generationTime) * 100)
          );
          dispatch(setPercentage(newPercentage));
        }, 1000);
        if (percentage > 60 && earlyRequest) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
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
