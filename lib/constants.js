import { PageItem } from "@/components/UI/page/elements";

export const USER_ROLE = "UserRole";
export const ADMIN_ROLE = "AdminRole";
export const UNAUTHORIZED = "Unauthorized";
export const UNAUTHORIZED_MSG = "User is not authorized.";
export const UNAUTHENTICATED = "Unauthenticated";
export const UNAUTHENTICATED_MSG = "User is not authenticated.";
export const GENERATE_BLOG_POST_COST = 10;

export const PlaceHolderPageItems = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PageItem key={index}>
          <div className="">Placeholder</div>
        </PageItem>
      ))}
    </>
  );
};
