"use server";

import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionAppUserServer, sessionUserRoleServer } from "../userServer";
import { BlogParameters } from "@/models/openai/parameters";

export const getAllBlogParams = async () => {
  const { userRole } = await sessionUserRoleServer();

  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    return [];
  }

  await userRole.populate("blogParameters");
  const blogParametersList = userRole.blogParameters.sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return blogParametersList || [];
};

export const deleteBlogParameters = async (blogParametersId) => {
  const { userRole } = await sessionUserRoleServer();
  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    return {
      success: false,
      message: `User ${
        userRole === UNAUTHORIZED ? "not authorized" : "not authenticated"
      }`,
    };
  }

  const deleted = await BlogParameters.findByIdAndDelete(blogParametersId);
  if (!deleted) {
    return {
      success: false,
      message: "Blog parameters not found or could not be deleted",
    };
  }

  return {
    success: true,
    message: "Blog parameters deleted successfully",
  };
};
