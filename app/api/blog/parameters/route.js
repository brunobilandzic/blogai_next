import { sessionAppUserServer } from "@/lib/actions/userServer";
import { getRoleObject } from "@/lib/actions/userServer";
import { checkAndDeductCredits } from "@/lib/openai/credits";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/parameters";

export async function GET(req) {
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  const userRole = getRoleObject(appUser, "UserRole");
  if (!userRole) {
    return Response.json(
      { message: "Unauthorized: No user role found for app user" },
      { status: 401 }
    );
  }

  const blogParams = await userRole.populate("blogParameters");

  console.log(blogParams);

  return Response.json({
    message: "Blog parameters fetched successfully",
    blogParams: blogParams,
  });
}

export async function POST(req) {
  console.log("Creating new blog parameters...");

  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  const userRole = getRoleObject(appUser, "UserRole");
  if (!userRole) {
    return Response.json(
      { message: "Unauthorized: No user role found for app user" },
      { status: 401 }
    );
  }

  const { success, message, remainingCredits } = await checkAndDeductCredits(
    userRole
  );
  console.log("Credit check:", success, message, remainingCredits);
  if (!success) {
    return Response.json({
      message,
      remainingCredits: userRole.credits,
    });
  }

  const body = await req.json();
  const validation = validateBlogParams(body);

  if (validation.error) {
    console.error("Validation error:", validation.error);
    return Response.json(
      {
        message: "Invalid blog parameters",
        errors: validation.error?.details,
      },
      { status: 400 }
    );
  }

  const blogParameters = new BlogParameters(body);
  blogParameters.role = userRole;
  userRole.blogParameters.push(blogParameters._id);

  let saveChapter = (chapterParam) => {
    return new Promise(async (resolve, reject) => {
      try {
        await chapterParam.save();
        resolve(chapterParam);
      } catch (error) {
        reject(error);
      }
    });
  };

  const promises = [];

  for (let chapterParams of body.chaptersParameters) {
    chapterParams["blogParameters"] = blogParameters._id;
    const chapterParam = new ChapterParameters(chapterParams);
    let promise = saveChapter(chapterParam);
    promises.push(promise);
  }

  const savedChapters = await Promise.all(promises);
  if (!savedChapters) {
    return Response.json(
      {
        message: "Error saving chapter parameters",
      },
      { status: 500 }
    );
  }
  console.log("Saved", savedChapters.length, "chapters.");
  blogParameters.chaptersParameters = savedChapters;

  await blogParameters.save();
  await userRole.save();

  console.log(
    `Blog parameters "${blogParameters.theme}" with ${blogParameters.chaptersParameters.length} chapters saved.`
  );

  return Response.json(
    {
      message: "Blog parameters saved successfully",
      blogParameters,
      remainingCredits,
    },
    { status: 201 }
  );
}
