import { useSession } from "next-auth/react";

export const sessionAppUserClient = async () => {
  const session = useSession();
  const res = await fetch("/api/auth/user");
  if (res.ok) {
    const appUser = await res.json();
    return {
      appUser,
      session,
    };
  } else {
    return null;
  }
};
