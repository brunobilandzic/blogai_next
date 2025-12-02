import { deleteBlogPost, generateBlogPost } from "@/lib/actions/blog/blog";
import { sessionAppUserServer } from "@/lib/actions/userServer";
import { getRoleObject, sessionUserRoleServer } from "@/lib/actions/userServer";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/parameters";
import {
  updateChapter,
  getBlogParametersById,
  deleteChapter,
  saveChapter,
  createChapterParameters,
  compare,
} from "@/lib/actions/blog/parameters";
import mongoose from "mongoose";

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

  await blogParameters.save();

  const generatedResult = await generateBlogPost(blogParameters._id);

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
  try {
    console.log("Updating blog parameters...");

    const { authError, userRole } = await sessionUserRoleServer();
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
    const sameParameters = await compare(blogParameters, body);
    if (sameParameters) {
      console.log("No changes detected in blog parameters. Skipping update.");
      return Response.json(
        {
          message: "No changes detected in blog parameters",
          blogParametersId: blogParameters._id,
          remainingCredits: userRole.credits,
          blogPostId: blogParameters.blogPost,
        },
        { status: 200 }
      );
    }

    const oldPromptText = blogParameters.promptText;
    const newPromptText = body.promptText;

    const chapterPromises = [];

    // Handle chapters with logging (we'll perform the same operations as the later loops
    // but include console.log in each if branch, then clear arrays so the original loops do nothing)
    for (let chapterParameters of body.chaptersParameters) {
      if (!chapterParameters) {
        console.log("Skipping falsy chapterParams:", chapterParameters);
        continue;
      }

      if (chapterParameters._id) {
        chapterPromises.push(
          updateChapter(chapterParameters, chapterParameters._id)
        );
      } else {
        chapterPromises.push(
          createChapterParameters(blogParameters, chapterParameters)
        );
      }
    }

    for (let existingChapter of blogParameters.chaptersParameters) {
      const found = body.chaptersParameters.find(
        (cp) => cp._id?.toString() === existingChapter._id?.toString()
      );
      if (!found) {
        chapterPromises.push(deleteChapter(existingChapter._id));
      } else {
        console.log(
          "Retaining existingChapter (found in incoming body):",
          existingChapter.title
        );
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

    const generatedResult = await generateBlogPost(freshBlogParams._id);

    if (!generatedResult) {
      return Response.json(
        { message: "Error generating blog post" },
        { status: 500 }
      );
    }
    const { blogPost, remainingCredits } = generatedResult;

    freshBlogParams.blogPost = blogPost._id;
    await freshBlogParams.save();

    if (oldPromptText !== newPromptText) {
      console.log("Prompt text changed, updating...");
      await BlogParameters.findByIdAndUpdate(blogParameters._id, {
        promptText: newPromptText,
      });
    } else {
      const editPromptBlogParameters = await BlogParameters.findById(
        freshBlogParams._id
      );
      editPromptBlogParameters.setPrompt();
      await editPromptBlogParameters.save();
      console.log(editPromptBlogParameters.promptText.slice(0, 100));
    }

    return Response.json(
      {
        message: "Blog parameters updated successfully",
        blogParametersId: freshBlogParams._id,
        remainingCredits,
        blogPostId: blogPost._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/blog/parameters:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
