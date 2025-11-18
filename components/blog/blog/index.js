"use client";
import { useState } from "react";
import { PageItem } from "../../UI/page/elements";
import Link from "next/link";

export const BlogPostComponent = ({ blogPost }) => {
  const { blogParameters, content, createdAt } = blogPost;
  const { theme, tone, length, audience } = blogParameters;

  console.log("Rendering BlogPostComponent for theme:", theme);

  return (
    <div className="">
      <div className="font-semibold text-lg ">{theme}</div>
      <div className="flex flex-col gap-1">
        <div className="">Tone: {tone}</div>
        <div className="">Length: {length}</div>
        <div className="">Audience: {audience}</div>
      </div>
      <div className="text-sm text-gray-600">
        Created At: {new Date(createdAt).toLocaleString("hr-HR")}
      </div>
      <div className="mt-4">
        <BlogPostContent content={content} />
      </div>
    </div>
  );
};

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
