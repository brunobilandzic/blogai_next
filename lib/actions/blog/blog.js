import {} from "@/models/openai";
import { sessionUserRoleServer } from "@/lib/actions/userServer";
import { UNAUTHORIZED, UNAUTHENTICATED } from "@/lib/constants";
import dbConnect from "@/lib/db/mongooseConnect";

export async function getAllBlogPosts() {
  await dbConnect();
  const userRole = await sessionUserRoleServer();

  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    return [];
  }

  await userRole.populate({
    path: "blogParameters",
    populate: { path: "blogPost" },
  });

  const blogPosts = [];
  for (let param of userRole.blogParameters) {
    param.blogPost ? blogPosts.push(param.blogPost) : null;
  }

  return blogPosts;
}
