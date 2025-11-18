import dbConnect from "@/lib/db/mongooseConnect";
import {} from "@/models/openai"
import { BlogPost } from "@/models/openai/blog";
import clean from "@/lib/db/clean";
import { BlogPostComponent } from "@/components/blog/blog";

export default async function Page({ params }) {
  await dbConnect();
  const { id } = await params;
  const blogPost = clean(
    await BlogPost.findById(id).populate("blogParameters")
  );

  if (!blogPost) {
    return <div>Blog Post not found for ID: {id}</div>;
  }

  return <BlogPostComponent blogPost={blogPost} />;
}
