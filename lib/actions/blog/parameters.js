"use server";

import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionAppUserServer, sessionUserRoleServer } from "../userServer";
import { BlogParameters } from "@/models/openai/parameters";
import { ChapterParameters } from "@/models/openai/parameters";

// Fetch all blog parameters for the authenticated user
export const getAllBlogParams = async () => {
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

export const updateChapter = async (freshChapterParams, cpId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("freshChapterParams to update:", freshChapterParams, cpId);
      const chapterParameters = await ChapterParameters.findById(cpId);
      console.log(200000000000000000000)
      console.log("saving updated chapterParams:", chapterParameters);
      Object.assign(chapterParameters, freshChapterParams);
      await saveChapter(chapterParameters);
      resolve(chapterParameters);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveChapter = async (chapterParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      await chapterParams.save();
      resolve(chapterParams);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteChapter = async (id) => {
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
