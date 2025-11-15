"use client";

export default function BlogResponse({ response }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Response</h2>
      <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {response}
      </div>
    </div>
  );
}
