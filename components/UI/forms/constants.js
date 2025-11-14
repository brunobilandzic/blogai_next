export const defaultChapterParams = {
  title: "",
  subChapters: [],
  length: "",
};

export const defaultBlogParams = {
  theme: "",
  description: "",
  audience: "",
  tone: "",
  length: "",
  chapterParameters: [defaultChapterParams],
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