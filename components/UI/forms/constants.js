export const defaultChapterParams = {
  title: "",
  subChapters: [""],
  length: "",
};

export const defaultBlogParameters = {
  theme: "",
  description: "",
  audience: "",
  tone: "",
  length: "",
  chaptersParameters: [defaultChapterParams],
  promptComment: "",
};

export const testBlogParameters = {
  theme: "The Future of Artificial Intelligence",
  description:
    "An in-depth analysis of how AI will shape various industries and our daily lives in the next decade.",
  audience: "Tech enthusiasts and professionals",
  tone: "formal",
  length: "long",
  chaptersParameters: [
    {
      title: "Introduction to AI",
      subChapters: [
        "Definition and history of AI",
        "Current state of AI technology",
      ],
      length: "medium",
    },
  ],
  promptComment:
    "Focus additionaly on kitchen, update chapters and subchapters.",
};

export const toneOptions = [
  { value: "formal", label: "Formal" },
  { value: "informal", label: "Informal" },
  { value: "neutral", label: "Neutral" },
];

export const getToneValues = () => {
  return toneOptions.map((option) => option.value);
};

export const lengthOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export const getLengthValues = () => {
  return lengthOptions.map((option) => option.value);
};

export const testChapterParameters = {
  title: "The Rise of AI in Healthcare",
  subChapters: ["AI-driven diagnostics", "Personalized treatment plans"],
  length: "medium",
};

export const defaultBlogParamsDesc = {
  theme: "",
  audience: "",
  description: "",
  additionalInstructions: "",
};

export const testBlogParamsDesc = {
  theme: "hajduk",
  audience: "djeca",
  description:
    "kako da djeca vole hajduka, a ne zive otpadnickim zivotom kao mnogi članovi torcide",
  promptComment: "Napiši na jednostavnom jeziku prilagođenom djeci.",
};
