import { sessionAppUserServer } from "@/lib/actions/userServer";
import { BlogParameters } from "@/models/openai/parameters";
import { BlogPost } from "@/models/openai/blog";

export async function POST(req) {
  // generate new blog post from openai response and save to db
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  const { responseText, blogParametersId } = await req.json();

  const blogParameters = await BlogParameters.findById(
    blogParametersId
  ).populate("chaptersParameters");
  if (!blogParameters) {
    return Response.json(
      { message: "Blog parameters not found" },
      { status: 404 }
    );
  }

  const blogPost = new BlogPost({
    blogParameters: blogParameters._id,
    content: responseText,
  });

  blogParameters.blogPost = blogPost._id;
  await blogParameters.save();

  await blogPost.save();

  return Response.json(
    { message: "Blog post created successfully", blogPost },
    { status: 201 }
  );
}
