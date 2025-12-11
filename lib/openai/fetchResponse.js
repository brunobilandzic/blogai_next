"use server";

import { testBlogParameters } from "@/components/UI/forms/constants";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const fetchResponse = async (prompt, { signal }) => {
  const response = await client.chat.completions.create(
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    },
    signal ? { signal } : undefined
  );

  return response?.choices?.[0]?.message?.content?.replace(/"/g, "'");
};

export const fetchParamsResponse = async (paramsDesc, { signal }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const content = testBlogParameters;
      /*  const content = `{
  "theme": "${paramsDesc.paramsDesc.theme}",
  "description": "${paramsDesc.paramsDesc.description}",
  "additionalInstructions": "${paramsDesc.paramsDesc.additionalInstructions}"
    }`; */
      const response = await client.chat.completions.create(
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: paramsDesc.prompt }],
        },
        signal ? { signal } : undefined
      );
      const content = response?.choices?.[0]?.message?.content;

      resolve({ ...paramsDesc, result: content });
    } catch (error) {
      reject(error);
    }
  });
};
