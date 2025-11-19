"use client";

// app/page.js
// Home page, put all in /components/home later

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/lib/store/features/counterSlice";
import { deleteAppUser } from "@/lib/store/features/appUserSlice";

const deleteDb = async (dispatch) => {
  const res = await axios.delete("/api/admin/deleteDb");
  signOut();
  dispatch(deleteAppUser());
  console.log(res.data);
};

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appUserInfo?.appUser);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Secure your website</h1>
      <p className="text-xl mb-4">
        Protect your website from threats with our comprehensive security
        solutions.
      </p>
      <button className="btn mb-3" onClick={() => deleteDb(dispatch)}>
        Delete Database
      </button>
      <br />
      <Link href="/agent">
        <button className="btn mb-6">Go to Agent</button>
      </Link>
      <div>
        <div className="mb-4">
          <div className="text-5xl">Counter value: {count}</div>
          <div className="flex space-x-4 mt-2">
            <button className="btn" onClick={() => dispatch(increment())}>
              Increment
            </button>
            <button className="btn" onClick={() => dispatch(decrement())}>
              Decrement
            </button>
          </div>
        </div>
      </div>
      {user ? (
        <div>
          <span className="font-bold mr-4">{user.name}</span>
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
          <Link href="/dashboard" className="ml-4">
            <button className="btn">Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn()} className="btn">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
