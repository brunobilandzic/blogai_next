import ParametersComponent from "@/components/blog/parameters";
import { PrametersResponseWrapper } from "@/components/wrappers/PrametersResponseWrapper";
import clean from "@/lib/db/clean";
import dbConnect from "@/lib/db/mongooseConnect";
import { BlogParameters } from "@/models/openai/parameters";

export default async function Page({ params }) {
  await dbConnect();
  const { id } = await params;
  const blogParameters = clean(
    await BlogParameters.findById(id)
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
