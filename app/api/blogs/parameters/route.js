import { sessionAppUserServer } from "@/lib/actions/user";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongooseConnect";
import { getRoleObject } from "@/lib/roles";
import { promiseSaveModel } from "@/lib/utils/db";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/params";

export async function GET(req) {
  const blogParams = await BlogParameters.find({});
  return Response.json({
    message: "Blog parameters fetched successfully",
    blogParams: blogParams,
  });
}

export async function POST(req) {
  console.log("Received POST request to /api/blogs/parameters");

  await dbConnect();
  const { appUser } = await sessionAppUserServer();

  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  const userRole = getRoleObject(appUser, "User");
  if (!userRole) {
    return Response.json(
      { message: "Unauthorized: No user role found for app user" },
      { status: 401 }
    );
  }

  const body = await req.json();
  console.log("Received body:", body);
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
  blogParameters.userRole = userRole;
  userRole.blogParametersCreated.push(blogParameters._id);
  const chapters = [];

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

  for (let chapter of body.chapters) {
    chapter["blogParameters"] = blogParameters._id;
    blogParameters.chapterParameters.push(chapter._id);
    const chapterParam = new ChapterParameters(chapter);
    console.log("Created ChapterParameters instance:", chapterParam);
    let promise = saveChapter(chapterParam);
    promises.push(promise);
  }
  const savedChapters = await Promise.all(promises);

  console.log("All chapters saved:", savedChapters);

  blogParameters.chapterParameters = savedChapters;

  await blogParameters.save();
  await userRole.save();

  console.log("Saved blog parameters with chapters:", {
    blogParameters,
    chapters,
  });
  return Response.json(
    {
      message: "Blog parameters saved successfully",
      blogParameters,
    },
    { status: 201 }
  );
}
