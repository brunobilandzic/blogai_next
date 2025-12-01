import "@/models/openai";
import ParametersComponent from "@/components/blog/parameters";
import clean from "@/lib/db/clean";
import dbConnect from "@/lib/db/mongooseConnect";
import { BlogParameters } from "@/models/openai/parameters";

export default async function Page({ params }) {
  await dbConnect();
  const { paramsId } = await params;
  const blogParameters = clean(
    await BlogParameters.findById(paramsId)
      .populate("chaptersParameters")
      .populate("blogPost")
  );

  if (!blogParameters) {
    return <div>Blog Parameters not found for ID: {id}</div>;
  }

  return (
    <>
      {" "}
      <ParametersComponent blogParameters={blogParameters} />{" "}
    </>
  );
}

export const revalidate = 0;
