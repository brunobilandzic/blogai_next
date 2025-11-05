import { sessionAppUserServer } from "@/lib/actions/user";

export async function GET(request) {
  const user = await sessionAppUserServer();
  if (user) {
    return Response.json(user);
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
