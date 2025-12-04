"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const checkDescriptionPrompt = async (description) => {
  return `Provjeri da li se u opisu govori o ikakvoj html strukturi ili tagovima. Ako se govori, odgovori sa "ne". Ako se ne govori, odgovori sa "da".`;
};

export const validateParamsDesc = async (description) => {
  const prompt = await checkDescriptionPrompt(description);
  const response = await fetchResponse(prompt);
  return response.toLowerCase() === "da";
};
