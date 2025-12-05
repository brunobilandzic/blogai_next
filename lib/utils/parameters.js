import { BlogParameters } from "@/models/openai/parameters";

export const sampleParams = {
  blog_posts: [
    {
      theme: "",
      blog_description: "",
      audience: "",
      chapters: [
        {
          name: "",
          description: "",
          sub_themes: [""],
        },
      ],
    },
  ],
};

export const sampleParamsDescription = `Produce a JSON object with one top-level property that contains an array of blog entries.
Each blog entry must include:
- a short topic string (the main theme),
- a brief paragraph describing the blog's purpose and scope,
- a short phrase identifying the target audience,
- an array of chapters.

Each chapter must include:
- a short title,
- a one- or two-sentence description of the chapter,
- an array of short strings representing subtopics for that chapter.

Return only valid JSON (no additional explanation). Generate between 1 and 5 blog entries with realistic, varied content and natural language values.`;

export const getParamExample = () => {
  let paramsExample = "";
  let chapterExample = "";
  const paramsObject = sampleParams.blog_posts[0];
  const chapterObject = paramsObject.chapters[0];

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

  return paramsExample;
};
