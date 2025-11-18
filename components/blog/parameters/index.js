"use client";

import { handleGenerateClick } from "@/lib/openai/responses/fetchResponse";
import { PageItem } from "@/components/UI/page/elements";
import Link from "next/link";

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

  const onGenerateClick = async () => {
    console.log(
      "Generating blog post with prompt:",
      blogParameters.promptText.length
    );
    setResponseMessage("Generating blog post...");
    const res = await handleGenerateClick(
      "hello world i am testing write some html, short",
      blogParameters._id
    );
    console.log("Blog post generated client string:", res);
    setResponseMessage(res);
  };

  console.log("id:", _id);

  return (
    <div className="border p-4 rounded-lg flex flex-col gap-2 shadow-sm">
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
      <div className="btn btn-action" onClick={onGenerateClick}>
        Generate
      </div>
      <div className="text-sm text-gray-600">
        Created At: {new Date(createdAt).toLocaleString("hr-HR")}
      </div>
    </div>
  );
}

export function NewParametersDashboardTile() {
  return (
    <PageItem>
      <Link href={"/blog/parameters/new"}>
        <div className="tile-title">
          Create blog parameters
        </div>
      </Link>
    </PageItem>
  );
}

export function ChaptersParameters({ chaptersParameters }) {
  console.log("chaptersParameters:", chaptersParameters);
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
  console.log("chapterParameter:", chapterParameter);
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
    <PageItem>
      <Link href="/blog/parameters">
        <div className="tile-title">View all created parameters</div>
      </Link>
    </PageItem>
  );
}
