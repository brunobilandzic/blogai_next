import dbConnect from "@/lib/db/mongooseConnect";
import {} from "@/models/openai";
import { BlogPostComponent } from "@/components/blog/blog";
import { getBlogPost } from "@/lib/actions/blog";

export default async function Page({ params }) {
  await dbConnect();
  const { blogId } = await params;

  if (!blogId || blogId.length != 24) {
    return <div>No ID provided.</div>;
  }

  const blogPost = await getBlogPost(blogId);

  if (!blogPost) {
    return <div>Blog Post not found for ID: {blogId}</div>;
  }

  if (!blogPost) {
    return <div>Blog Post not found for ID: {blogId}</div>;
  }

  return <BlogPostComponent blogPost={blogPost} />;
}
