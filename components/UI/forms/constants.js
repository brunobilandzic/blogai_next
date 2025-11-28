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
};

export const toneOptions = [
  { value: "formal", label: "Formal" },
  { value: "informal", label: "Informal" },
  { value: "neutral", label: "Neutral" },
];

export const lengthOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export const testChapterParameters = {
  title: "The Rise of AI in Healthcare",
  subChapters: ["AI-driven diagnostics", "Personalized treatment plans"],
  length: "medium",
};
