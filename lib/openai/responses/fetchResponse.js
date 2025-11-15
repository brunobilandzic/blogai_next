"use server";

// lib/openai/fetch_response.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const fetchResponse = async ({ prompt }) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
};

export const   handleGenerateClick = async (prompt) => {
  console.log("Generating response...");

  if (!prompt || prompt.trim() === "") {
    alert("Please enter a prompt.");
    return;
  }

  const res = await fetchResponse({ prompt });
  console.log("Received response:", res);
  return res
};
