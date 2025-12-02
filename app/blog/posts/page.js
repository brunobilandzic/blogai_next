import BlogList from "@/components/blog/blog/List";
import { getAllBlogPosts } from "@/lib/actions/blog/blog";

export default async function Page() {
  const blogList = await getAllBlogPosts();
  return (
    <>
      <BlogList blogList={blogList} />
    </>
  );
}
