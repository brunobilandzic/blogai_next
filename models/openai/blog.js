import mongoose from "mongoose";

// Schema for blog post
const blogPostSchema = new mongoose.Schema({
  blogParameters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogParameters",
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


export const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);