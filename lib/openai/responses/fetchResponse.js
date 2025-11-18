"use server";

import { BlogPost } from "@/models/openai/blog";
// lib/openai/fetch_response.js
import OpenAI from "openai";
import { createBlog } from "../crud/blogs";
import { BlogParameters } from "@/models/openai/parameters";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const fetchResponse = async (prompt) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion?.choices?.[0]?.message?.content?.replace(/"/g, "'");
};

export const handleGenerateClick = async (prompt, blogParametersId) => {
  const blogParameters =  await BlogParameters.findById(blogParametersId);

  if (!prompt || prompt.trim() === "") {
    alert("Please enter a prompt.");
    return;
  }

  const res = await fetchResponse(prompt);
  console.log("Generated response:", res);

  const blogPost = await createBlog({
    content: res,
    blogParameters: blogParametersId,
  });

  await blogParameters.save();
  await blogPost.save();
  console.log("Saved blogParameters with blogPost ID:", blogParametersId);
  console.log("Created blog post:", blogPost);
  return res;
};
