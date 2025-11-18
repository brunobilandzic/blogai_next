import BlogParametersList from "@/components/blog/parameters/List";
import { getAllBlogParams } from "@/lib/actions/blog/parameters";

export default async function Page() {
  const blogParams = await getAllBlogParams();
  return (
    <>
      <BlogParametersList blogParametersList={blogParams} />
    </>
  );
}
