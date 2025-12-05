"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const fetchResponse = async (prompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response?.choices?.[0]?.message?.content?.replace(/"/g, "'");
};

export const fetchParamsResponse = async (paramsDesc) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: paramsDesc.prompt }],
      });
      const content = response?.choices?.[0]?.message?.content;
      console.log("Fetched parameters response:", content);
      resolve({ ...paramsDesc, result: content });
    } catch (error) {
      reject(error);
    }
  });
};
