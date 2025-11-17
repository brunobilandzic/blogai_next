import { PrametersResponseWrapper } from "@/components/wrappers/PrametersResponseWrapper";
import clean from "@/lib/db/clean";
import { BlogParameters } from "@/models/openai/parameters";

export default async function Page({ params }) {
  const { id } = await params;
  const blogParameters = clean(
    await BlogParameters.findById(id).populate("chaptersParameters")
  );

  if (!blogParameters) {
    return <div>Blog Parameters not found for ID: {id}</div>;
  }

  return (
    <>
      {" "}
      <PrametersResponseWrapper blogParameters={blogParameters} />{" "}
    </>
  );
}
