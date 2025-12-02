import { sessionAppUserServer } from "@/lib/actions/userServer";
import { UserRole } from "@/models/user/User";

export async function POST(req) {
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { addCreditsAmount } = body;
  if (typeof addCreditsAmount !== "number" || addCreditsAmount <= 0) {
    return Response.json(
      { message: "Invalid credits amount" },
      { status: 400 }
    );
  }

  const userRole = appUser.roles.find(
    (role) => role.roleName === "UserRole"
  )?.role;

  if (!userRole) {
    return Response.json(
      { message: "UserRole not found for the app user" },
      { status: 404 }
    );
  }

  userRole.credits += addCreditsAmount;
  await userRole.save();

  return Response.json(
    { message: "Credits updated successfully", credits: userRole.credits },
    { status: 200 }
  );
}
