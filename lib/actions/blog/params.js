import { getRoleObject } from "@/lib/roles";
import { sessionAppUserServer } from "../user";

export const getAllBlogParams = async () => {
  // fetch blog parameters for the authenticated user

  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    throw new Error("User not authenticated");
  }
  const userRole = await getRoleObject(appUser, "User");
  if (!userRole) {
    throw new Error("User role not found");
  }

  console.log("User role fetched:", userRole);

  const blogParams = userRole.populate("blogParameters");
  return blogParams;
};
