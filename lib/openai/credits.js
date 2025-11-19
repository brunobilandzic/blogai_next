import { BLOG_POST_PRICE } from "@/lib/constants";

export const checkAndDeductCredits = async (userRole) => {
  const credits = userRole.credits || 0;

  if (credits < BLOG_POST_PRICE) {
    return {
      success: false,
      message: "Insufficient credits to create a blog post.",
    };
  }

  userRole.credits = credits - BLOG_POST_PRICE;
  await userRole.save();

  return {
    success: true,
    message: "Credits deducted successfully.",
    remainingCredits: userRole.credits,
  };
};
