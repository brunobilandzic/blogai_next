// app/api/auth/user/route.js
// API route to get the authenticated user's AppUser data
// Called from a appUser provider in lib/providers.js
// which populates the Redux store with the AppUser data

import { sessionAppUserServer } from "@/lib/actions/userServer";

export async function GET(req) {
  const { _, appUser } = await sessionAppUserServer();
  if (appUser) {
    return Response.json(
      { appUser },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
