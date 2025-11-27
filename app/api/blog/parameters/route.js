import { deleteBlogPost, generateBlogPost } from "@/lib/actions/blog/blog";
import { sessionAppUserServer } from "@/lib/actions/userServer";
import { getRoleObject } from "@/lib/actions/userServer";
import { validateBlogParams } from "@/lib/validators/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/parameters";
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
    },
    { status: 201 }
  );
}

export async function PUT(req) {
  console.log("Updating blog parameters...");

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

  const blogParameters = await BlogParameters.findById(body._id).populate(
    "chaptersParameters"
  );

  if (!blogParameters) {
    return Response.json(
      { message: "Blog parameters not found" },
      { status: 404 }
    );
  }

  body.chapterParameters = body.chaptersParameters.filter(
    (cp) =>
      !(
        typeof cp === "undefined" ||
        cp === null ||
        cp._id === null ||
        cp._id === ""
      )
  );

  Object.assign(blogParameters, body);

  // PROMISES FOR CHAPTERS
  let updateChapter = (chapterParams, cpId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const chapterParameter = await ChapterParameters.findById(cpId);
        Object.assign(chapterParameter, chapterParams);
        await saveChapter(chapterParameter);
        resolve(chapterParameter);
      } catch (error) {
        reject(error);
      }
    });
  };
  let saveChapter = async (chapterParams) => {
    await chapterParams.save();
    return chapterParams;
  };
  let deleteChapter = (id) => {
    return new Promise(async (resolve, reject) => {
      console.log(`deleting chapterParams id: ${id}`);
      try {
        if (!id) {
          console.log("No ID provided for chapter deletion.");
          resolve(true);
          return;
        }
        await ChapterParameters.deleteOne({ _id: id });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const promises = [];

  for (let chapterParams of body.chaptersParameters) {
    if (!chapterParams) continue;

    if (chapterParams._id) {
      console.log(
        `updating chapterParams: ${chapterParams.title}, id: ${chapterParams?._id}`
      );
      const existingChapterId = blogParameters.chaptersParameters.find(
        (cpid) => cpid.toString() === chapterParams?._id.toString()
      );
      console.log("existingChapterId found:", existingChapterId);
      let promise = updateChapter(chapterParams, existingChapterId);
      promises.push(promise);
    } else {
      const newChapterParams = new ChapterParameters(chapterParams);
      newChapterParams["blogParameters"] = blogParameters._id;

      blogParameters.chaptersParameters.push(newChapterParams._id);
      console.log("new chapterParams:", newChapterParams.title);
      let promise = saveChapter(newChapterParams);
      promises.push(promise);
    }
  }

  console.log(
    "entering delete, existing are:",
    blogParameters.chaptersParameters
  );

  for (let existingChapterId of blogParameters.chaptersParameters) {
    if (
      !body.chaptersParameters.find(
        (cp) => cp._id?.toString() === existingChapterId?.toString()
      )
    ) {
      console.log("deleting chapterParams id:", existingChapterId);
      let promise = deleteChapter(existingChapterId);
      promises.push(promise);
    }
  }

  const updatedChapters = await Promise.all(promises);
  if (!updatedChapters) {
    return Response.json(
      {
        message: "Error saving chapter parameters",
      },
      { status: 500 }
    );
  }
  console.log("Resolved", updatedChapters.length, "chapter promises.");

  let freshBlogParams = await BlogParameters.findByIdAndUpdate(
    blogParameters._id,
    { ...blogParameters, chaptersParameters: updatedChapters },
    { new: true }
  ).populate("chaptersParameters");

  freshBlogParams.setPrompt();

  console.log("freshBlogParams bid:", freshBlogParams.blogPost);

  // await deleteBlogPost(freshBlogParams.blogPost);
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

  freshBlogParams = await BlogParameters.findById(freshBlogParams._id);
  freshBlogParams.blogPost = blogPost._id;

  console.log("freshBlogParams blog id generated:", freshBlogParams.blogPost);

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
