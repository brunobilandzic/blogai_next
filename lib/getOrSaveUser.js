import { AppUser, Customer } from "@/models/User";
import dbConnect from "./mongooseConnect";

async function getOrSaveUser(email) {
  await dbConnect();

  const username = email.split("@")[0];
  let appUser;
  let customer;

  appUser = await AppUser.findOne({ username });

  if (appUser) {
    console.log("User found:", appUser);
  }

  if (!appUser) {
    console.log("User not found, creating new user.");
    appUser = new AppUser({ email, username });
    await appUser.save();
    console.log("New user created:", appUser);

    const customer = new Customer({ appUser: appUser._id, credits: 0 });
    await customer.save();
    console.log("New customer created:", customer);
  }
  console.log("getOrSaveUser completed for username:", appUser?.username);

  if (appUser) return true;
  else return false;
}

export default getOrSaveUser;
