import { BlogParametersList } from "@/components/blog/parameters/list";
import { getAllBlogParams } from "@/lib/actions/blog/params";

export default async function Page() {
  const blogParams = await getAllBlogParams();
  return (
    <>
      <BlogParametersList blogParametersList={blogParams} />
    </>
  );
}
