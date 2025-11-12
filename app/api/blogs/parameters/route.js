import { saveModel } from "@/lib/utils/db";
import { BlogParameters } from "@/models/openai/params";
import { validateBlogParams } from "@/validation/params";

export async function GET(req) {
  return Response.json({ message: "Blog parameters route is working." });
}

export async function POST(req) {
  console.log("POST blog parameters route");

  const body = await req.json();
  console.log("Received body:", body);

  const blogParameters = new BlogParameters(body);

  return await saveModel(blogParameters);
}
