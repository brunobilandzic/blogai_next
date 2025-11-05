import { DashboardComponent } from "@/components/user/dashboard";
import { NotLoggedInComponent } from "@/components/UI";
import { auth } from "@/auth";
import {Customer} from "@/models/User";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  console.log("DashboardPage session user:", user);
  if (!user) {
    return <NotLoggedInComponent />;
  }
  // Fetch additional user-related data from your API
  console.log("Fetching customer data for user ID:", user);
  const customer = await Customer.findOne({ account: user.id });

  console.log("Customer data:", customer);

  return <DashboardComponent user={user} customer={customer} />;
}
