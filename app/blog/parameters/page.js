import BlogParametersList from "@/components/blog/parameters/List";
import { getAllBlogParameters } from "@/lib/actions/parameters";
import clean from "@/lib/db/clean";

export default async function Page() {
  const blogParameters = clean(await getAllBlogParameters());
  return (
    <>
      <BlogParametersList blogParametersList={blogParameters} />
    </>
  );
}
