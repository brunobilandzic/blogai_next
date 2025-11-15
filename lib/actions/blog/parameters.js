import { getRoleObject } from "@/lib/roles";
import { sessionAppUserServer } from "../user";
import { BlogParameters } from "@/models/openai/parameters";

export const getAllBlogParams = async () => {
  // fetch blog parameters for the authenticated user
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    throw new Error("User not authenticated");
  }
  let userRole = await getRoleObject(appUser, "UserRole");
  if (!userRole) {
    throw new Error("User role not found");
  }

  userRole = await userRole.populate("blogParameters");
  return userRole.blogParameters || [];
};

export const getBlogParamsById = async (id) => {
  const blogParameters = await BlogParameters.findOne({ _id: id }).lean();
  return blogParameters;
};
