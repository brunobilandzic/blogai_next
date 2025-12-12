import { deleteBlogPost, generateBlogPost } from "@/lib/actions/blog";
import { sessionAppUserServer } from "@/lib/actions/userServer";
import { getRoleObject, sessionUserRoleServer } from "@/lib/actions/userServer";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/parameters";
import {
  updateChapter,
  getBlogParametersById,
  deleteChapter,
  createChapterParameters,
  compare,
  createBlogParameters,
} from "@/lib/actions/parameters";

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
  let blogParameters;
  try {
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

    // Prepare blog parameters data
    const body = await req.json();
    body["prompt"] = { promptText: "", promptComment: body.promptComment };
    const { generateBlog, ...blogParametersData } = body;
    const validation = validateBlogParams(blogParametersData);

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

    blogParameters = await createBlogParameters(blogParametersData);

    if (!blogParameters) {
      return Response.json(
        {
          message: "Error saving blog parameters",
        },
        { status: 500 }
      );
    }
    let generatedResult;
    if (generateBlog) {
      generatedResult = await generateBlogPost(blogParameters._id, {
        signal: req.signal,
      });

      if (!generatedResult) {
        return Response.json(
          {
            message: "Error generating blog post",
            blogParametersId: blogParameters._id,
          },
          { status: 500 }
        );
      }
    } else {
      generatedResult = {};
    }

    return Response.json(
      {
        message: "Blog parameters saved successfully",
        blogParametersId: blogParameters._id,
        ...generatedResult,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in /api/blog POST:", err?.message || err);
    if (blogParameters) {
      await deleteBlogPost(blogParameters.blogPost);
      await blogParameters.deleteOne();
    }
    const message = err?.message || "Unknown error";
    return Response.json({ message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
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

    const chapterPromises = [];

    for (let chapterParameters of body.chaptersParameters) {
      if (!chapterParameters) {
        continue;
      }

      if (chapterParameters._id) {
        chapterPromises.push(
          updateChapter(chapterParameters, chapterParameters._id)
        );
      } else {
        chapterPromises.push(
          createChapterParameters(blogParameters._id, chapterParameters)
        );
      }
    }

    for (let existingChapter of blogParameters.chaptersParameters) {
      const found = body.chaptersParameters.find(
        (cp) => cp._id?.toString() === existingChapter._id?.toString()
      );
      if (!found) {
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

    body["prompt"] = {
      ...blogParameters.prompt.toObject(),
      promptComment: body.promptComment,
    };
    const { chaptersParameters, generateBlog, ...blogParamsData } = body;

    blogParamsData.blogPost && (await deleteBlogPost(blogParamsData.blogPost));
    let freshBlogParams = await BlogParameters.findByIdAndUpdate(
      blogParameters._id,
      {
        ...blogParamsData,
        $set: {
          chaptersParameters: updatedChapters.map((chapter) => chapter._id),
        },
      },
      { new: true }
    );

    await freshBlogParams.populate("chaptersParameters");
    await freshBlogParams.save();

    let generatedResult;
    if (generateBlog) {
      generatedResult = await generateBlogPost(freshBlogParams._id, {
        signal: req.signal,
      });
      if (!generatedResult) {
      return Response.json(
        { message: "Error generating blog post" },
        { status: 500 }
      );
    }
    } else {
      generatedResult = {};
    }

    return Response.json(
      {
        message: "Blog parameters updated successfully",
        blogParametersId: freshBlogParams._id,
        ...generatedResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/blog/parameters:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
