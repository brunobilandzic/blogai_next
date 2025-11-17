"use server";

import { BlogPost } from "@/models/openai/blog";
// lib/openai/fetch_response.js
import OpenAI from "openai";
import { createBlog } from "../crud/blogs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const fetchResponse = async ({ prompt }) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion?.choices?.[0]?.message?.content?.replace(/"/g, "'");
};

export const handleGenerateClick = async (prompt) => {
  console.log("Generating response...");

  if (!prompt || prompt.trim() === "") {
    alert("Please enter a prompt.");
    return;
  }

  const res = await fetchResponse({ prompt, blogParameters });
  
  const blogPost = await createBlog({
    content: res,
    blogParameters,
  });

  await blogPost.save();
  console.log("Created blog post:", blogPost);
  return res;
};
