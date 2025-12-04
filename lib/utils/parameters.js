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
  let example = "";
  Object.keys(BlogParameters.schema.obj).forEach((key) => {
    example += `${key}: ${JSON.stringify(BlogParameters.schema.obj[key])}\n`;
  });

  return example;
};
