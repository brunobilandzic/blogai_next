import { testBlogParameters } from "@/components/UI/forms/constants";

export const sampleParams = {
  blog_posts: [testBlogParameters],
};

export const getParamExample = () => {
  let paramsExample = "";
  let chapterExample = "";
  const paramsObject = sampleParams.blog_posts[0];
  console.log("Params object:", paramsObject);
  const chapterObject = paramsObject.chaptersParameters[0];

  for (const [key, value] of Object.entries(chapterObject)) {
    if (Array.isArray(value)) {
      chapterExample += ` ${key}: [string,],`;
      continue;
    }
    chapterExample += ` ${key}: ${typeof value},`;
  }

  for (const [key, value] of Object.entries(paramsObject)) {
    const value = paramsObject[key];
    if (Array.isArray(value) && key === "chapters") {
      paramsExample += ` ${key}: [${chapterExample}],`;
      continue;
    }
    paramsExample += ` ${key}: ${typeof value},`;
  }

  console.log("Params example:", paramsExample);

  return paramsExample;
};
