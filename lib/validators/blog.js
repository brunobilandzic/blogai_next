import { defaultAudiences } from "@/app/api/blogs/utils/constants";
import Joi from "joi";

/*
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
  promptText: { type: String },

  */

const blogParamsSchema = Joi.object({
  theme: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  audience: Joi.string().min(3).max(200).default(defaultAudiences).required(),
  length: Joi.string()
    .default("medium")
    .valid("short", "medium", "long")
    .required(),
  tone: Joi.string(),
  chaptersParameters: Joi.array().items(
    Joi.object({
      title: Joi.string().min(3).max(200).required(),
      subChapters: Joi.array().items(Joi.string().min(3).max(200)).required(),
      length: Joi.string()
        .default("medium")
        .valid("short", "medium", "long")
        .required(),
    })
  ),
});

export function validateBlogParams(blogParams) {
  return blogParamsSchema.validate(blogParams);
}
