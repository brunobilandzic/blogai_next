"use client";

import { handleGenerateClick } from "@/lib/actions/blog/blog";
import { PageItem } from "@/components/UI/page/elements";
import Link from "next/link";
import { getUserRoleClient } from "@/lib/actions/userClient";
import { useDispatch, useSelector } from "react-redux";
import { deductCredits } from "@/lib/store/features/appUserSlice";
import { GENERATE_BLOG_POST_COST } from "@/lib/constants";
import { getRemainingCredits } from "@/lib/store/features/helpers";

export default function ParametersComponent({
  blogParameters,
  setResponseMessage,
}) {
  const {
    _id,
    theme,
    description,
    tone,
    length,
    audience,
    chaptersParameters,
    createdAt,
  } = blogParameters;

  const userRole = getUserRoleClient();
  const dispatch = useDispatch();
  const remainingCredits = useSelector((state) => getRemainingCredits(state));

  const onGenerateClick = async () => {
    const { response, remainingCredits } = await handleGenerateClick(
      "hello world i am testing write some html, short",
      blogParameters._id
    );

    dispatch(
      deductCredits({
        remainingCredits,
      })
    );
    alert(`Generated response! Remaining credits: ${remainingCredits}`);
    setResponseMessage(response);
  };

  return (
    <div className="flex flex-col gap-2 shadow-sm">
      <div className="font-semibold text-lg ">{theme}</div>
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
      <div className="fcs gap-2">
        <div className="text-sm text-gray-600">
          Remaining credits: {userRole?.credits}
        </div>
        <div className="btn btn-action" onClick={onGenerateClick}>
          Generate
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Created At: {new Date(createdAt).toLocaleString("hr-HR")}
      </div>
    </div>
  );
}

export function NewParametersDashboardTile() {
  return (
    <Link href={"/blog/parameters/new"}>
      <PageItem>
        <div className="tile-title">Create blog parameters</div>
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
        <div className="tile-title">View all created parameters</div>
      </PageItem>
    </Link>
  );
}
