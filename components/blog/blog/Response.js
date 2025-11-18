"use client";
import { useState } from "react";

export default function ResponseComponent({ responseMessage }) {
  const [html, setHtml] = useState(false);
  return (
    <>
    {JSON.stringify(html)}
      { (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <div className="my-2 flex gap-2">
            <div className={`btn ${html ? "btn-active" : "btn-inactive"}`} onClick={() => setHtml(true)}>HTML</div>
            <div className={`btn ${!html ? "btn-active" : "btn-inactive"}`} onClick={() => setHtml(false)}>Text</div>
          </div>
          {html && (
            <div dangerouslySetInnerHTML={{ __html: responseMessage }} />
          )}
          {!html && <div>{responseMessage}</div>}
        </div>
      )}
    </>
  );
}
