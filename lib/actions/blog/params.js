import { getRoleObject } from "@/lib/roles";
import { sessionAppUserServer } from "../user";

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



   userRole =  await userRole.populate("blogParameters");
  return userRole.blogParameters || [];
};
