import { sessionAppUserServer } from "@/lib/actions/user";

export async function GET(request) {
  const { _, appUser } = await sessionAppUserServer();
  if (appUser) {
    console.log()
    return Response.json({ appUser}, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
