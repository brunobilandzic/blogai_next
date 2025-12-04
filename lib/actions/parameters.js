"use server";

import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionUserRoleServer } from "./userServer";
import { BlogParameters } from "@/models/openai/parameters";
import { ChapterParameters } from "@/models/openai/parameters";
import clean from "@/lib/db/clean";
import { testBlogParamsDesc } from "@/components/UI/forms/constants";

// Fetch all blog parameters for the authenticated user
export const getAllBlogParameters = async () => {
  const { userRole } = await sessionUserRoleServer();

  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    throw new Error(
      `User ${
        userRole === UNAUTHORIZED ? "not authorized" : "not authenticated"
      }`
    );
  }

  await userRole.populate("blogParameters");

  const blogParametersList = userRole.blogParameters.sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return blogParametersList || [];
};

// Delete blog parameters by ID for the authenticated user
export const deleteBlogParameters = async (blogParametersId) => {
  const { userRole } = await sessionUserRoleServer();

  const deleted = await BlogParameters.findByIdAndDelete(blogParametersId);
  if (!deleted) {
    return {
      success: false,
      message: "Blog parameters not found or could not be deleted",
    };
  }

  return {
    success: true,
    message: "Blog parameters deleted successfully",
  };
};

// Fetch a single blog parameters by ID
export const getBlogParametersById = async (blogParametersId) =>
  await BlogParameters.findById(blogParametersId).populate(
    "chaptersParameters"
  );

export const createChapterParameters = async (
  blogParameters,
  chapterParams
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const feshBlogParameters = await getBlogParametersById(
        blogParameters._id
      );
      const newChapterParams = new ChapterParameters(chapterParams);
      newChapterParams.blogParameters = blogParameters._id;
      feshBlogParameters.chaptersParameters.push(newChapterParams._id);
      await feshBlogParameters.save();
      await newChapterParams.save();
      resolve(newChapterParams);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateChapter = async (freshChapterParameters, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapterParameters = await ChapterParameters.findById(id);

      if (!chapterParameters) {
        throw new Error(`Chapter parameters with ID ${id} not found`);
      }

      const same = await compare(chapterParameters, freshChapterParameters);
      if (same) {
        resolve(chapterParameters);
        return;
      }
      Object.assign(chapterParameters, freshChapterParameters);
      await saveChapter(chapterParameters);

      resolve(chapterParameters);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveChapter = async (chapterParameters) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!chapterParameters) {
        resolve(null);
        return;
      }
      await chapterParameters?.save();
      resolve(chapterParameters);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteChapter = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve(false);
        return;
      }
      const chapterParameters = await ChapterParameters.findByIdAndDelete(id);
      if (!chapterParameters) {
        resolve(false);
        return;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const compare = async (doc1, doc2) => {
  const same = JSON.stringify(clean(doc1)) === JSON.stringify(clean(doc2));
  return same;
};

export const generateBlogParams = async (paramsDesc = testBlogParamsDesc) => {};

const buildParamsPrompt = async (paramsDesc) => {
  const valid = await validateParamsDesc(paramsDesc.description);
  if (!valid) {
    throw new Error("Invalid parameters description");
  }
};
