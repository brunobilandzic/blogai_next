import { sessionAppUserServer } from "@/lib/actions/user";
import { UserRole } from "@/models/user/User";

export async function POST(req) {
  const { appUser } = await sessionAppUserServer();
  if (!appUser) {
    return Response.json(
      { message: "Unauthorized: No app user found in session" },
      { status: 401 }
    );
  }
  //const body = await req.json();

  const userRoleEntry = appUser.roles.find(
    (role) => role.roleName === "UserRole"
  );
  if (!userRoleEntry) {
    return Response.json(
      { message: "UserRole not found for the app user" },
      { status: 404 }
    );
  }

  const userRoleId = userRoleEntry.role._id;
  const userRole = await UserRole.findById(userRoleId);
  if (!userRole) {
    return Response.json(
      { message: "UserRole document not found" },
      { status: 404 }
    );
  }

  userRole.credits += 10;
  await userRole.save();

  return Response.json(
    { message: "Credits updated successfully", credits: userRole.credits },
    { status: 200 }
  );
}
