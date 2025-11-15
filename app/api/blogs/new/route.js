import { sessionAppUserServer } from "@/lib/actions/user";

export async function POST(req) {
  // generate new blog post from openai response and save to db
  console.log("Creating new blog parameters...");
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  return Response.json(
    { message: "Blog parameters created successfully" },
    { status: 201 }
  );
}
