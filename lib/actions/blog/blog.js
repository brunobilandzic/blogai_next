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
import clean from "@/lib/db/clean";

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

export const getBlogPost = async (blogPostId) => {
  await dbConnect();
  const blogPost = await BlogPost.findById(blogPostId).populate(
    "blogParameters"
  );
  return clean(blogPost);
};

const processGenerateClickAuth = (userRole) => {
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

export const generateBlogPost = async (prompt, blogParametersId) => {
  await dbConnect();
  const blogParameters = await BlogParameters.findById(blogParametersId);
  const { userRole, appUser } = await sessionUserRoleServer();
  processGenerateClickAuth(userRole);

  if (!prompt || prompt.trim() === "") {
    alert("Please enter a prompt.");
    return;
  }

  const response = await fetchResponse(prompt);

  const blogPost = new BlogPost({
    blogParameters: blogParametersId,
    content: response,
  });
  blogParameters.blogPost = blogPost._id;

  userRole.credits -= GENERATE_BLOG_POST_COST;

  await userRole.save();
  await blogParameters.save();
  await blogPost.save();

  return {
    blogPost: clean(blogPost),
    remainingCredits: userRole.credits,
  };
};

export const deleteBlogPost = async (blogPostId) => {
  if(!blogPostId){
    return
  }
  await dbConnect();
  const blogPost = await BlogPost.findById(blogPostId);
  if (!blogPost) {
    throw new Error("Blog post not found.");
  }

  const result = await BlogPost.deleteOne({ _id: blogPostId });
  if (!result.deletedCount || result.deletedCount === 0) {
    throw new Error("Blog post not deleted.");
  }
  const blogParameters = await BlogParameters.findOne({ blogPost: blogPostId });
  if (!blogParameters) {
    throw new Error("Blog parameters not found for the given blog post.");
  }

  blogParameters.blogPost = null;
  await blogParameters.save();

  return { success: true };
};
