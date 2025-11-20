import { UNAUTHENTICATED, UNAUTHORIZED } from "@/lib/constants";
import { sessionAppUserServer, sessionUserRoleServer } from "../userServer";
import { BlogParameters } from "@/models/openai/parameters";

export const getAllBlogParams = async () => {
  const { userRole } = await sessionUserRoleServer();

  if (userRole == UNAUTHORIZED || userRole == UNAUTHENTICATED) {
    return [];
  }

  await userRole.populate("blogParameters");
  const blogParametersList = userRole.blogParameters.sort((a, b) => b.createdAt - a.createdAt);
  return blogParametersList || [];
};

export const getBlogParamsById = async (id) => {
  const blogParameters = await BlogParameters.findOne({ _id: id }).lean();
  return blogParameters;
};
