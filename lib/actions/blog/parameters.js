"use server";

import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionAppUserServer, sessionUserRoleServer } from "../userServer";
import { BlogParameters } from "@/models/openai/parameters";
import { ChapterParameters } from "@/models/openai/parameters";
import clean from "@/lib/db/clean";

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
      console.log("Creating chapterParams:", chapterParams.title);
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

export const updateChapter = async (freshChapterParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chapterParameters = await ChapterParameters.findById(
        freshChapterParams._id
      );

      if (!chapterParameters) {
        throw new Error(
          `Chapter parameters with ID ${freshChapterParams._id} not found`
        );
      }

      if (
        JSON.stringify(clean(chapterParameters)) ===
        JSON.stringify(freshChapterParams)
      ) {
        console.log(
          "No changes detected for chapterParameters:",
          chapterParameters.title
        );
        resolve(chapterParameters);
        return;
      }

      console.log("Updating old chapterParams:", chapterParameters.title);
      Object.assign(chapterParameters, freshChapterParams);
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
        console.log("No chapterParameters provided for saving.");
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
        console.log("No ID provided for chapter deletion.");
        resolve(false);
        return;
      }
      const chapterParameters = await ChapterParameters.findByIdAndDelete(id);
      if (!chapterParameters) {
        console.log(`ChapterParameters with ID ${id} not found.`);
        resolve(false);
        return;
      }
      console.log(`Deleting chapterParameters - ${chapterParameters.title}...`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
