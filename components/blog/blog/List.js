import { BlogParameters } from "@/models/openai/parameters";
import Link from "next/link";

export default function BlogList({ blogList }) {
  console.log(`Fetched ${blogList?.length} blogs:`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
      {blogList?.map((blogPost) => (
        <div key={blogPost._id} className="mb-4">
          <Link href={`/blog/${blogPost._id}`}>
            <BlogPostTile blogPost={blogPost} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function BlogPostTile({ blogPost }) {
  const blogParameters = await BlogParameters.findById(blogPost.blogParameters);
  return (
    <>
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-lg mb-2">{blogParameters.theme}</div>
        <div className="mb-2">{blogParameters.description}</div>
        <div className="text-sm text-gray-600">
          {new Date(blogParameters.createdAt).toLocaleString("hr-HR")}
        </div>
      </div>
    </>
  );
}
