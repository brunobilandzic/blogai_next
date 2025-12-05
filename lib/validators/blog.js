import { defaultAudiences } from "@/lib/utils/defaults";
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
  theme: Joi.string().min(3).max(200),
  description: Joi.string().min(0).max(1000),
  audience: Joi.string().min(3).max(200).default(defaultAudiences),
  length: Joi.string().default("medium").valid("short", "medium", "long"),
  tone: Joi.string(),
  chaptersParameters: Joi.array().items(
    Joi.object({
      title: Joi.string().min(3).max(200),
      subChapters: Joi.array().items(Joi.string().min(3).max(200)),
      length: Joi.string().default("medium").valid("short", "medium", "long"),
    })
  ),
  prompt: Joi.object({
    promptText: Joi.string().allow(""),
    promptComment: Joi.string().allow(""),
  }),
});

export function validateBlogParams(blogParams) {
  return blogParamsSchema.validate(blogParams, { allowUnknown: true });
}
