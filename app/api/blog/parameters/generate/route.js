import { sessionUserRoleServer } from "@/lib/actions/userServer";
import { validateParamsPrompt } from "@/lib/validators/blog";
import { ParamsPrompt } from "@/models/openai/prompt";

export async function POST(req) {
  const { userRole } = await sessionUserRoleServer();
  if (!userRole) {
    return Response.json(
      { message: "Unauthorized: No user role found for app user" },
      { status: 401 }
    );
  }

  const body = await req.json();

  console.log("Received blog parameters for generation:", body);

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
  }

  const paramsPrompt = new ParamsPrompt({
    theme: body.theme,
    description: body.description,
    audience: body.audience,
  });

  await paramsPrompt.save();

  return Response.json(
    {
      message: "Parameters prompt saved successfully",
      promptText: paramsPrompt.promptText,
    },
    { status: 200 }
  );
}
