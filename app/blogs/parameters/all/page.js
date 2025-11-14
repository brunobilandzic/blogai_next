import { getAllBlogParams } from "@/lib/actions/blog/params";

export default async function Page() {
  const blogParams = await getAllBlogParams();
  console.log("Fetched blog parameters:", blogParams);
  return <div>All Blog Parameters Page</div>;
}
