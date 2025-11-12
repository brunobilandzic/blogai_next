import mongoose from "mongoose";

// Schema for blog parameters
// it includes theme, description, tone, length and chapters.
const blogParametersSchema = new mongoose.Schema({
  blogPrompt: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPrompt" },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  audience: { type: String, required: true },
  tone: {
    type: String,
    required: true,
    enum: ["formal", "informal", "neutral"],
    default: "neutral",
  },
  length: {
    type: String,
    required: true,
    enum: ["short", "medium", "long"],
    default: "medium",
  },
  chapters: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ChapterParameters" },
  ],
});

// Schema for chapter parameters
// it includes theme, description, subChapters and length.
const chapterParametersSchema = new mongoose.Schema({
  blogParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogParameters",
  },
  theme: { type: String, required: true },
  description: { type: String, required: true },
  subChapters: [{ type: String }],
  length: {
    type: String,
    required: true,
    enum: ["short", "medium", "long"],
    default: "medium",
  },
});

blogParametersSchema.methods.chaptersString = function () {
  chaptersString = "";

  for (let chapter of this.chapters) {
    chaptersString += chapter.chapterString() + "; ";
  }

  return chaptersString;
};

chapterParametersSchema.methods.chapterString = function () {
  return `Poglavlje ${this.theme} -> Opis poglavlja ${this.theme}: ${
    this.description
  }, Pod-teme poglavlja ${this.theme}: ${this.subChapters.join(
    ", "
  )}, Duljina poglavlja: ${this.length}`;
};

export const BlogParameters =
  mongoose.models.BlogParameters ||
  mongoose.model("BlogParameters", blogParametersSchema);
export const ChapterParameters =
  mongoose.models.ChapterParameters ||
  mongoose.model("ChapterParameters", chapterParametersSchema);
