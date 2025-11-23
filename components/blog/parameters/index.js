"use client";

import { deleteBlogPost, handleGenerateClick } from "@/lib/actions/blog/blog";
import { PageItem } from "@/components/UI/page/elements";
import Link from "next/link";
import { getUserRoleClient } from "@/lib/actions/userClient";
import { useDispatch, useSelector } from "react-redux";
import { deductCredits } from "@/lib/store/features/appUserSlice";
import { getRemainingCredits } from "@/lib/store/features/helpers";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParametersComponent({ blogParameters }) {
  const {
    _id: id,
    theme,
    description,
    tone,
    length,
    audience,
    chaptersParameters,
    createdAt,
    blogPost,
  } = blogParameters;

  const router = useRouter();
  const dispatch = useDispatch();
  const remainingCredits = useSelector((state) => getRemainingCredits(state));
  const [blogPostId, setBlogPostId] = useState(blogPost?._id || null);

  const onGenerateClick = async () => {
    const { remainingCredits, blogPost } = await handleGenerateClick(
      "hello world i am testing write some html, short",
      blogParameters._id
    );

    dispatch(deductCredits({ remainingCredits }));

    alert(`Generated response! Remaining credits: ${remainingCredits}`);
    setBlogPostId(blogPost._id);
    router.push(`/blog/${blogPost._id}`);
  };

  const onDeleteBlog = async () => {
    const { success } = await deleteBlogPost(blogPostId);
    if (success) {
      alert("Blog post deleted successfully.");
    }
    setBlogPostId(null);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className="text-sm text-gray-600">
        Created At: {new Date(createdAt).toLocaleString("hr-HR")}
      </div>
      <div
        className="font-semibold text-lg text-link"
        onClick={() => {
          router.push(`${id}/edit`);
        }}
      >
        {theme}
      </div>
      <div className="flex flex-col gap-1">
        <div className="">Tone: {tone}</div>
        <div className="">Length: {length}</div>
        <div className="">Audience: {audience}</div>
      </div>
      <div className="">{description}</div>
      <div className="font-semibold text-md ">Chapters:</div>
      <div className="w-full">
        <ChaptersParameters chaptersParameters={chaptersParameters} />
      </div>

      {!blogPostId && (
        <div className="fcc mt-4 gap-2">
          <div className="text-sm text-gray-600">
            Remaining credits: {remainingCredits}
          </div>
          <div className="btn btn-action" onClick={onGenerateClick}>
            Generate
          </div>
        </div>
      )}
      {blogPostId && (
        <div className="fsc gap-4">
          <div className="text-green-700 font-semibold">
            Blog post already generated.
          </div>
          <div
            className="text-3xl cursor-pointer hover:text-gray-800"
            onClick={onDeleteBlog}
          >
            <MdDeleteForever />
          </div>
        </div>
      )}
    </div>
  );
}

export function NewParametersDashboardTile() {
  return (
    <Link href={"/blog/parameters/new"}>
      <PageItem>
        <div>Create blog parameters</div>
      </PageItem>
    </Link>
  );
}

export function ChaptersParameters({ chaptersParameters }) {
  return (
    <div className="flex flex-wrap w-full">
      {chaptersParameters.map((chapterParameters, i) => (
        <div className="w-1/6" key={i}>
          <ChapterParameters chapterParameter={chapterParameters} />
        </div>
      ))}
    </div>
  );
}

export function ChapterParameters({ chapterParameter }) {
  return (
    <div className="border p-4 rounded-lg flex flex-col gap-2 shadow-sm text-sm ">
      <div className="font-semibold text-md ">{chapterParameter.title}</div>
      <div className="flex flex-col gap-1">
        <div className="">Length: {chapterParameter.length}</div>
        <div className="">SubChapters:</div>
        <ul className="list-disc list-inside">
          {chapterParameter.subChapters.map((subChapter, index) => (
            <li key={index}>{subChapter}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ViewAllParametersTile() {
  return (
    <Link href="/blog/parameters">
      <PageItem>
        <div>View all created parameters</div>
      </PageItem>
    </Link>
  );
}
