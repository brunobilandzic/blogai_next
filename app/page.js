"use client";

import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div style={{}}>
      <h1 className="text-4xl font-bold mb-4">Secure your website</h1>

      <p className="text-xl mb-4">
        Protect your website from threats with our comprehensive security
        solutions.
      </p>
      {(user && (
        <div>
          <span className="font-bold mr-4">{user.name}</span>
          <span className="cursor-pointer" onClick={() => signOut()}>sign out</span>
        </div>
      )) || (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => signIn()} className="">
            Login
          </Button>
          <Button onClick={() => signOut()} className="">
            Subscribe
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}
