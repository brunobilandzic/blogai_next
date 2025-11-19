"use server";

import { fetchResponse } from "@/lib/openai/fetchResponse";
import { sessionUserRoleServer } from "@/lib/actions/userServer";
import {
  UNAUTHORIZED,
  UNAUTHENTICATED,
  GENERATE_BLOG_POST_COST,
} from "@/lib/constants";
import dbConnect from "@/lib/db/mongooseConnect";
import { BlogPost } from "@/models/openai/blog";
import { BlogParameters } from "@/models/openai/parameters";

export async function getAllBlogPosts() {
  await dbConnect();
  const { userRole } = await sessionUserRoleServer();

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

const processGenerate = (userRole) => {
  if (userRole === UNAUTHENTICATED) {
    throw new Error("User is not authenticated.");
  }
  if (userRole === UNAUTHORIZED) {
    throw new Error("User is not authorized.");
  }
  if (userRole.credits < GENERATE_BLOG_POST_COST) {
    throw new Error("Insufficient credits to generate blog post.");
  }
};

export const handleGenerateClick = async (prompt, blogParametersId) => {
  const blogParameters = await BlogParameters.findById(blogParametersId);
  const { userRole, appUser } = await sessionUserRoleServer();
  processGenerate(userRole);

  if (!prompt || prompt.trim() === "") {
    alert("Please enter a prompt.");
    return;
  }

  const response = await fetchResponse(prompt);
  console.log("Generated response:", response);

  const blogPost = new BlogPost({
    blogParameters: blogParametersId,
    content: response,
  });

  userRole.credits -= GENERATE_BLOG_POST_COST;
  console.log(
    `Deducted ${GENERATE_BLOG_POST_COST} credits. Remaining credits: ${userRole.credits} from user ${appUser.username}`
  );
  await userRole.save();
  await blogParameters.save();
  await blogPost.save();

  console.log("Blog post saved:", blogParameters.theme);
  return { response, remainingCredits: userRole.credits };
};
