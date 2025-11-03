import mongoose from "mongoose";

const customerObject = {
  credits: { type: Number, default: 0 },
};

const appUserObject = {
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  
};

export const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", new mongoose.Schema(customerObject));

export const Account = mongoose.connection.collection("accounts");

export const AppUser =
  mongoose.models.AppUser ||
  mongoose.model("AppUser", new mongoose.Schema(appUserObject));
