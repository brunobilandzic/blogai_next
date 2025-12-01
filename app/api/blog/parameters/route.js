import { deleteBlogPost, generateBlogPost } from "@/lib/actions/blog/blog";
import { sessionAppUserServer } from "@/lib/actions/userServer";
import { getRoleObject } from "@/lib/actions/userServer";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/parameters";
import {
  updateChapter,
  getBlogParametersById,
  deleteChapter,
  saveChapter,
  createChapterParameters,
} from "@/lib/actions/blog/parameters";
import { cleanSubdocuments } from "@/lib/db/clean";
import { BlogPost } from "@/models/openai/blog";

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

  return Response.json({
    message: "Blog parameters fetched successfully",
    blogParams: blogParams,
  });
}

export async function POST(req) {
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

  console.log(`Creating new blog parameters ${body.theme}...`);
  const blogParameters = new BlogParameters(body);
  blogParameters.role = userRole;
  userRole.blogParameters.push(blogParameters._id);

  const promises = [];

  for (let chapterParams of body.chaptersParameters) {
    chapterParams["blogParameters"] = blogParameters._id;
    const chapterParam = new ChapterParameters(chapterParams);
    promises.push(saveChapter(chapterParam));
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
  blogParameters.chaptersParameters = savedChapters;

  await blogParameters.save()

  const generatedResult = await generateBlogPost(
    blogParameters.promptText,
    blogParameters._id
  );

  if (!generatedResult) {
    return Response.json(
      { message: "Error generating blog post" },
      { status: 500 }
    );
  }

  const { blogPost, remainingCredits } = generatedResult;
  blogParameters.blogPost = blogPost._id;

  await blogParameters.save();
  await userRole.save();

  return Response.json(
    {
      message: "Blog parameters saved successfully",
      blogParametersId: blogParameters._id,
      blogPostId: blogPost._id,
      remainingCredits,
    },
    { status: 201 }
  );
}

export async function PUT(req) {
  console.log("Updating blog parameters...");

  const { authError } = await sessionAppUserServer();
  if (authError) {
    return Response.json(
      { message: `AUTH ERROR: ${authError}` },
      { status: 401 }
    );
  }

  const body = await req.json();

  // Validate incoming blog parameters
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

  // Fetch existing blog parameters
  let blogParameters = await getBlogParametersById(body._id);
  if (!blogParameters) {
    return Response.json(
      { message: "Blog parameters not found" },
      { status: 404 }
    );
  }

  const chapterPromises = [];

  for (let chapterParams of body.chaptersParameters) {
    if (!chapterParams) continue;

    if (chapterParams._id) {
      chapterPromises.push(updateChapter(chapterParams, chapterParams._id));
    } else {
      chapterPromises.push(
        createChapterParameters(blogParameters, chapterParams)
      );
    }
  }

  for (let existingChapter of blogParameters.chaptersParameters) {
    if (
      !body.chaptersParameters.find(
        (cp) => cp._id?.toString() === existingChapter._id?.toString()
      )
    ) {
      chapterPromises.push(deleteChapter(existingChapter._id));
    }
  }

  const updatedChapters = await Promise.all(chapterPromises);

  if (!updatedChapters) {
    return Response.json(
      {
        message: "Error saving chapter parameters",
      },
      { status: 500 }
    );
  }

  const { chaptersParameters, ...bodyWithoutChapters } = body;

  await deleteBlogPost(bodyWithoutChapters.blogPost);
  let freshBlogParams = await BlogParameters.findByIdAndUpdate(
    blogParameters._id,
    {
      ...bodyWithoutChapters,
      $set: {
        chaptersParameters: updatedChapters.map((chapter) => chapter._id),
      },
    },
    { new: true }
  );
  freshBlogParams.setPrompt();

  const generatedResult = await generateBlogPost(
    freshBlogParams.promptText,
    freshBlogParams._id
  );

  if (!generatedResult) {
    return Response.json(
      { message: "Error generating blog post" },
      { status: 500 }
    );
  }

  const { blogPost, remainingCredits } = generatedResult;
  freshBlogParams.blogPost = blogPost._id;

  await freshBlogParams.save();

  return Response.json(
    {
      message: "Blog parameters updated successfully",
      blogParametersId: freshBlogParams._id,
      remainingCredits,
      blogPostId: blogPost._id,
    },
    { status: 200 }
  );
}
