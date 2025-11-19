"use client";

import { useState } from "react";
import { handleGenerateClick } from "@/lib/openai/fetchResponse";

export default function OAITest() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    const res = await handleGenerateClick(prompt);
    setResponse(res);
  };

  return (
    <div>
      <h1 className="text-3xl">OAI Test Page</h1>
      <p>This is a test page for OpenAI integration.</p>
      <p>Here you can test the OpenAI API integration with your application.</p>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="mt-2">
          <p>Prompt is {prompt}</p>
          <p>Response is {response}</p>
        </div>
      </div>
      <div className="mt-2">
        <button
          className="btn btn-action"
          onClick={() => handleClick(prompt)}
        >
          Test OpenAI API
        </button>
      </div>
    </div>
  );
}
