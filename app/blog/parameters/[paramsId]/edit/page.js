import BlogParametersForm from "@/components/UI/forms/parameters";
import { BlogParameters } from "@/models/openai/parameters";
import React from "react";
import clean from "@/lib/db/clean";
import dbConnect from "@/lib/db/mongooseConnect";

export default async function Page({ params }) {
  await dbConnect();
  const { paramsId } = await params;

  const blogParameters = await BlogParameters.findById(paramsId)
    .populate("chaptersParameters")
    .lean();

  console.log("chaptersParameters:", blogParameters?.chaptersParameters);
  return (
    <div>
      <BlogParametersForm _blogParameters={clean(blogParameters)} />
    </div>
  );
}
