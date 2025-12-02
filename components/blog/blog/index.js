"use client";
import { useState } from "react";
import { PageItem } from "../../UI/page/elements";
import Link from "next/link";
import { MdDeleteForever, MdOpenInNew } from "react-icons/md";
import Popup, { PopupConfirmAction } from "@/components/UI/popups";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/lib/actions/blog/blog";

export const BlogPostComponent = ({ blogPost }) => {
  const { blogParameters, content, createdAt } = blogPost;
  return (
    <div className="">
      <BlogPostInfo {...blogParameters} blogCreatedAt={createdAt} />

      <div className="mt-4">
        <BlogPostContent content={content} />
      </div>
    </div>
  );
};

export const AllBlogsDashboardTile = () => {
  return (
    <Link href={"/blog"}>
      <PageItem>
        <div>View All Blogs</div>
      </PageItem>
    </Link>
  );
};

export function BlogPostContent({ content }) {
  const [html, setHtml] = useState(false);

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
      {html && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: content?.replace(/\n/g, "<br />"),
          }}
        />
      )}
      {!html && <div>{content}</div>}
    </>
  );
}

export const BlogPostInfo = ({
  _id: blogParametersId,
  theme,
  tone,
  length,
  audience,
  description,
  blogCreatedAt,
  blogPost: blogPostId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onDeleteConfirm = async () => {
    await deleteBlogPost(blogPostId);
    setIsOpen(false);
    router.push("/blog/posts");
  };

  return (
    <div>
      <div className="mb-2">
        <div className="text-sm text-gray-600">
          Created At: {new Date(blogCreatedAt).toLocaleString("hr-HR")}
        </div>
        <div className="fsc gap-2 relative">
          <div className="font-semibold text-lg">{theme}</div>
          <div
            className="text-red-600 cursor-pointer hover:text-red-800 text-2xl "
            title="Delete Blog Post"
            onClick={() => setIsOpen(true)}
          >
            <MdDeleteForever />
          </div>
          <div>
            <PopupConfirmAction
              isOpen={isOpen}
              onCancel={() => setIsOpen(false)}
              onConfirm={() => {
                // Add your confirm action logic here
                onDeleteConfirm();
              }}
              message="Are you sure you want to delete this blog post?"
            />
          </div>
        </div>
      </div>
      <div className="mb-2  text-gray-700">{description}</div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="">Tone: {tone}</div>
        <div className="">Length: {length}</div>
        <div className="">Audience: {audience}</div>

        <Link href={`/blog/parameters/${blogParametersId}/edit`}>
          <div className="text-link flex items-center gap-1">
            Edit Parameters{" "}
            <div className="mt-0.5">
              <MdOpenInNew />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
