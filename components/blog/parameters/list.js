"use client";

import { PageItem } from "@/components/UI/page/elements";
import { PlaceHolderPageItems } from "@/lib/constants";
import Link from "next/link";
import { MdAdd, MdCheck } from "react-icons/md";
import { useRouter } from "next/navigation";
import clean from "@/lib/db/clean";

export default function BlogParametersList({ blogParametersList }) {
  console.log(`Fetched ${blogParametersList.length} blog parameters:`);

  return (
    <>
      <div className="tiles-grid">
        {blogParametersList.map((params, i) => {
          console.log("Blog id:", params.blogPost);
          return (
            <div className="relative" key={i}>
              <Link href={`/blog/parameters/${params._id}`}>
                <PageItem>
                  <BlogParametersTile blogParameters={params} />
                </PageItem>
              </Link>
              <BlogExistsCheck blogPostId={params.blogPost} />
            </div>
          );
        })}
        <PlaceHolderPageItems count={5} />

        <Link href="/blog/parameters/new">
          <div className="text-5xl h-full flex justify-start items-center w-fit">
            <MdAdd />
          </div>
        </Link>
      </div>
    </>
  );
}

export function BlogParametersTile({ blogParameters }) {
  return (
    <>
      <div className="">
        <div className="font-semibold text-lg mb-2">{blogParameters.theme}</div>
        <div className="mb-2">{blogParameters.description}</div>
        <div className="text-sm text-gray-600">
          {new Date(blogParameters.createdAt).toLocaleString("hr-HR")}
        </div>
      </div>
    </>
  );
}

const BlogExistsCheck = ({ blogPostId }) => {
  const router = useRouter();
  console.log("Blog post ID:", blogPostId);
  return (
    <div className="absolute bottom-2 right-2">
      {blogPostId && (
        <Link href={`/blog/${blogPostId}`}>
          <div
            className="text-2xl text-green-500 z-5 hover:text-green-700 cursor-pointer"
          >
            <MdCheck />
          </div>
        </Link>
      )}
    </div>
  );
};
