import { generateBlogPost } from "@/lib/actions/blog";

export async function POST(req) {
  try {
    console.log("Received POST request to /api/blog");
    const body = await req.json();
    const blogParametersId =
      body?.blogParametersId || body?.blogParameters || body?.id;

    if (!blogParametersId) {
      return Response.json(
        { message: "Missing blogParametersId in request body" },
        { status: 400 }
      );
    }



    // Pass the request abort signal so generation can be cancelled by the client
    const result = await generateBlogPost(blogParametersId, {
      signal: req.signal,
    });

    return Response.json({ success: true, ...result }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/blog POST:", err?.message || err);

    const message = err?.message || "Unknown error";

    return Response.json({ message }, { status: 500 });
  }
}
