import dbConnect from "@/lib/db/mongooseConnect";
import { saveModel } from "@/lib/utils/db";
import { validateBlogParams } from "@/lib/validators/blog";
import { Subchapter } from "@/models/openai/blog";
import { BlogParameters, ChapterParameters } from "@/models/openai/params";

export async function GET(req) {
  const blogParams = await BlogParameters.find({});
  return Response.json({
    message: "Blog parameters fetched successfully",
    blogParams: blogParams,
  });
}

export async function POST(req) {
  await dbConnect();
  console.log("POST blog parameters route");

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
  console.log("Created BlogParameters instance:", blogParameters);
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
    blogParameters.chapters.push(chapter._id);
    const chapterParam = new ChapterParameters(chapter);
    console.log("Created ChapterParameters instance:", chapterParam);
    let promise = saveChapter(chapterParam);
    promises.push(promise);
  }
  const savedChapters = await Promise.all(promises);

  console.log("All chapters saved:", savedChapters);

  blogParameters.chapters = savedChapters;

  await blogParameters.save();

  console.log("Saved blog parameters with chapters:", {
    blogParameters,
    chapters,
  });
  return Response.json(
    {
      message: "Blog parameters saved successfully",
      blogParameters,
      savedChapters,
    },
    { status: 201 }
  );
}
