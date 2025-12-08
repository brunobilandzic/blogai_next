import BlogParametersForm from "@/components/UI/forms/parameters";
import { BlogParameters } from "@/models/openai/parameters";
import React from "react";
import clean from "@/lib/db/clean";
import dbConnect from "@/lib/db/mongooseConnect";

export default async function Page({ params }) {
  await dbConnect();
  const { paramsId } = await params;

  const blogParameters = clean(
    await BlogParameters.findById(paramsId).populate("chaptersParameters")
  );

  blogParameters["promptComment"] = blogParameters.prompt.promptComment;
  delete blogParameters.prompt;

  console.log("Editing blog parameters:", blogParameters);

  return (
    <div>
      <BlogParametersForm _blogParameters={clean(blogParameters)} />
    </div>
  );
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
