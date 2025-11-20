import dbConnect from "@/lib/db/mongooseConnect";
import {} from "@/models/openai";
import { BlogPost } from "@/models/openai/blog";
import clean from "@/lib/db/clean";
import { BlogPostComponent } from "@/components/blog/blog";
import { findById } from "@/lib/db/crud";

export default async function Page({ params }) {
  await dbConnect();
  const { id } = await params;

  if (!id || id.length != 24) {
    return <div>No ID provided.</div>;
  }

  const blogPost = await findById(BlogPost, id);

  if (!blogPost) {
    return <div>Blog Post not found for ID: {id}</div>;
  }

  const cleanedBlogPost = clean(blogPost);

  if (!blogPost) {
    return <div>Blog Post not found for ID: {id}</div>;
  }

  return <BlogPostComponent blogPost={cleanedBlogPost} />;
}
