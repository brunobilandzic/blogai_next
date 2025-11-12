import Joi from "joi";

export const blogParamsValidation = Joi.object({
  blogPrompt: Joi.string().hex().length(24).optional().allow(null),
  theme: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().min(1).required(),
  audience: Joi.string().trim().min(1).required(),
  tone: Joi.string().trim().valid().min(1).required(),
  length: Joi.string()
    .valid("formal", "informal", "neutral")
    .default("neutral")
    .required(),
  chapters: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const chapterParamsValidation = Joi.object({
  blogParameters: Joi.string().hex().length(24).optional().allow(null),
  theme: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().min(1).required(),
  subChapters: Joi.array().items(Joi.string().trim().min(1)).optional(),
  length: Joi.string()
    .valid("short", "medium", "long")
    .default("medium")
    .required(),
});

export const validateBlogParams = (data) => {
  return blogParamsValidation.validate(data);
};

export const validateChapterParams = (data) => {
  return chapterParamsValidation.validate(data);
};
