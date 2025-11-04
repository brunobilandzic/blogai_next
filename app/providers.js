
import dbConnect from "@/lib/mongooseConnect";
import { SessionProvider } from "next-auth/react";

export default async function Providers({ children }) {
  await dbConnect();
  return <SessionProvider>{children}</SessionProvider>;
}
