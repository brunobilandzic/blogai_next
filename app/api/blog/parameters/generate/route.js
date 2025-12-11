import { generateBlogParams } from "@/lib/actions/parameters";
import { sessionUserRoleServer } from "@/lib/actions/userServer";

export async function POST(req) {
  const { userRole } = await sessionUserRoleServer();
  if (!userRole) {
    return Response.json(
      { message: "Unauthorized: No user role found for app user" },
      { status: 401 }
    );
  }
  const start = Date.now();
  const body = await req.json();
  /* 
  const validation = validateParamsPrompt(body);

  if (validation.error) {
    console.error("Validation error:", validation.error);
    return Response.json(
      {
        message: "Invalid parameters for prompt generation",
        errors: validation.error?.details,
      },
      { status: 400 }
    );
  } */

  const blogParameters = await generateBlogParams(body.paramsDescs, {
    signal: req.signal,
  });
  const end = Date.now();
  return Response.json(
    {
      message: `Generated ${blogParameters.length} blog parameters successfully`,
      blogParametersThemes: blogParameters.map((bp) => bp.theme),
      generationTime: (end - start) / 1000,
    },
    { status: 200 }
  );
}
