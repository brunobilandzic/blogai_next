import { sessionAppUserServer } from "@/lib/actions/userServer";

export async function GET(req) {
  const { session, appUser } = await sessionAppUserServer();

  return Response.json(
    {
      status: session?.status,
      user: appUser || null,
      expires: session?.expires || null,
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
