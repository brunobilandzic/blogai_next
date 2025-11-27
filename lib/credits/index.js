import { sessionUserRoleServer } from "../actions/userServer";

export const checkRemainingCredits = async (amount) => {
  const { userRole } = await sessionUserRoleServer();

  if (userRole && userRole.creditsRemaining >= amount) {
    return true;
  } else {
    return false;
  }
};
