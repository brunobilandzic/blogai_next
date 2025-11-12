import mongoose from "mongoose";

// Schema for blog post
const blogSchema = new mongoose.Schema({
  BlogParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogParameters",
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)