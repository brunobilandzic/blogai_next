"use server";

import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionUserRoleServer } from "./userServer";
import { BlogParameters } from "@/models/openai/parameters";
import { ChapterParameters } from "@/models/openai/parameters";
import clean from "@/lib/db/clean";
import {
  testBlogParamsDesc,
  getLengthValues,
  getToneValues,
} from "@/components/UI/forms/constants";
import { getParamExample } from "../utils/parameters";
import { fetchParamsResponse } from "../openai/fetchResponse";
import { extractJson } from "@/lib/utils/json";

// Create new blog parameters for the authenticated user
export const createBlogParameters = async (blogParameters) => {
  const { userRole } = await sessionUserRoleServer();

  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    throw new Error(
      `User ${
        userRole === UNAUTHORIZED ? "not authorized" : "not authenticated"
      }`
    );
  }

  const { chaptersParameters, ...bodyWithoutChapters } = blogParameters;
  const newBlogParameters = new BlogParameters(bodyWithoutChapters);
  newBlogParameters.userRole = userRole._id;

  userRole.blogParameters.push(newBlogParameters._id);
  await userRole.save();
  const newChapters = await createChaptersParameters(
    newBlogParameters,
    chaptersParameters || []
  );
  newBlogParameters.chaptersParameters = newChapters.map(
    (chapter) => chapter._id
  );

  await newBlogParameters.populate("chaptersParameters");
  await newBlogParameters.save();

  console.log(
    "Created blog parameters\n\tID:",
    newBlogParameters._id,
    "\n\tTheme:",
    newBlogParameters.theme,
    "\n\tChapters length:",
    newBlogParameters.chaptersParameters.length
  );

  return newBlogParameters;
};

export const generateBlogParams = async (
  _paramsDescs = [testBlogParamsDesc],
  { signal }
) => {
  let paramsDescs = [];
  for (const [i, paramsDesc] of _paramsDescs.entries()) {
    paramsDescs.push({
      ...paramsDesc,
      prompt: await buildParamsPrompt(paramsDesc),
      result: null,
      index: i,
    });
  }
  const promises = [];
  for (const pd of paramsDescs) {
    promises.push(fetchParamsResponse(pd, { signal }));
  }

  const response = await Promise.all(promises);

  paramsDescs = response.map((res) => {
    const extracted = extractJson(res.result);
    const promptComment = res.promptComment;
    delete extracted.promptComment;
    return { ...extracted, prompt: { promptComment: promptComment } };
  });

  const generatePromises = [];
  for (const pd of paramsDescs) {
    generatePromises.push(generateFromDesc(pd));
  }
  const blogParameters = await Promise.all(generatePromises);
  return clean(blogParameters);
};

const generateFromDesc = async (paramsDesc) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogParameters = await createBlogParameters(paramsDesc);
      resolve(blogParameters);
    } catch (error) {
      reject(error);
    }
  });
};

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
  blogParameters_id,
  chapterParams
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newChapterParams = new ChapterParameters(chapterParams);
      newChapterParams.blogParameters = blogParameters_id;
      await newChapterParams.save();
      resolve(newChapterParams);
    } catch (error) {
      reject(error);
    }
  });
};

export const createChaptersParameters = async (
  blogParameters,
  chaptersParameters
) => {
  const chaptersPromises = [];
  for (const chapterParameters of chaptersParameters) {
    chaptersPromises.push(
      createChapterParameters(blogParameters._id, chapterParameters)
    );
  }
  const createdChapters = await Promise.all(chaptersPromises);

  return createdChapters.map((ch) => ch._id);
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

const buildParamsPrompt = async (paramsDesc) => {
  return `Tvoj je zadatak generirati json dokument s poljima kao iz primjera ${getParamExample()}\n Ovo je tema blog posta: ${
    paramsDesc.theme
  }. Općeniti opis blog posta je ${
    paramsDesc.description
  }. Opcije za tone polje su ${getToneValues().join(
    ", "
  )}, a za duljinu blog posta su ${getLengthValues().join(
    ", "
  )}. Za ta polja odaberi vrijednosti koje smatraš prikladnima. Publika za koju je blog post namijenjen je: ${
    paramsDesc.audience
  }. Tvoj je zadatak napisati json stringified dokument koji kasnije mogu parsirati pomocu JSON.parse funkcije u JavaScriptu. Vrati samo validan JSON bez dodatnih objašnjenja. Sve ključeve napiši kao u primjerima, a vrijednosti piši na hrvatskom jeziku.`;
};
