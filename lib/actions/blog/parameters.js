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