"use client";
import { useState } from "react";
import { BlogPostContent } from ".";

export default function ResponseComponent({ responseMessage }) {
  const [html, setHtml] = useState(false);
  return (
    <>
      {JSON.stringify(html)}
      {
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <BlogPostContent content={responseMessage} />
        </div>
      }
    </>
  );
}
