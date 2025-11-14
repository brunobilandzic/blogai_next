import mongoose from "mongoose";

// Schema for blog post
const blogSchema = new mongoose.Schema({
  blogParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogParameters",
  },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  createdAt: { type: Date, default: Date.now },
});

// Schema for chapters within a blog post
const chapterSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  chapterParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChapterParameters",
  },
  subChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subchapter" }],
});

// Schema for subchapters within a chapter, containing actual content
const subchapterSchema = new mongoose.Schema({
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);
export const Subchapter =
  mongoose.models.Subchapter || mongoose.model("Subchapter", subchapterSchema);
