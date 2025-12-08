import {
  defaultBlogParameters,
  testBlogParameters,
} from "@/components/UI/forms/constants";

export const sampleParams = {
  blog_posts: [defaultBlogParameters],
};

export const getParamExample = () => {
  let paramsExample = "";
  let chapterExample = "";
  const paramsObject = sampleParams.blog_posts[0];
  const chapterObject = paramsObject.chaptersParameters[0];

  for (const [key, value] of Object.entries(chapterObject)) {
    if (Array.isArray(value)) {
      chapterExample += ` ${key}: [string,],`;
      continue;
    }
    chapterExample += ` ${key}: ${typeof value},`;
  }

  for (const [key, value] of Object.entries(paramsObject)) {
    if (Array.isArray(value) && key === "chaptersParameters") {
      paramsExample += ` ${key}: [${chapterExample}],`;
      continue;
    }
    paramsExample += ` ${key}: ${typeof value},`;
  }

  return paramsExample;
};
