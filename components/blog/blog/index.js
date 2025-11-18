"use client";

import { useState } from "react";
import { PageItem } from "../../UI/page/elements";
import Link from "next/link";

export const AllBlogsDashboardTile = () => {
  console.log("Rendering AllBlogsDashboardTile");
  return (
    <PageItem>
      <Link href={"/blog"}>
        <div className="tile-title">View All Blogs</div>
      </Link>
    </PageItem>
  );
};

export function BlogPostContent({ content }) {
  const [html, setHtml] = useState(false);

  console.log("Rendering BlogPostContent with html:", html);
  return (
    <>
      <div className="my-2 flex gap-2">
        <div
          className={`btn ${html ? "btn-active" : "btn-inactive"}`}
          onClick={() => setHtml(true)}
        >
          HTML
        </div>
        <div
          className={`btn ${!html ? "btn-active" : "btn-inactive"}`}
          onClick={() => setHtml(false)}
        >
          Text
        </div>
      </div>{" "}
      {html && <div dangerouslySetInnerHTML={{ __html: content }} />}
      {!html && <div>{content}</div>}
    </>
  );
}
