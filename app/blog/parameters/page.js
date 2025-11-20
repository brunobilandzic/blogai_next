import BlogParametersList from "@/components/blog/parameters/List";
import { getAllBlogParams } from "@/lib/actions/blog/parameters";
import clean from "@/lib/db/clean";

export default async function Page() {
  const blogParams = clean(await getAllBlogParams());
  return (
    <>
      <BlogParametersList blogParametersList={blogParams} />
    </>
  );
}
