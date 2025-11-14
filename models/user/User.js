import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  appUser: { type: mongoose.Schema.Types.ObjectId, ref: "AppUser" },
  credits: { type: Number, default: 0 },
  blogParameters: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BlogParameters" },
  ],
});

const adminRoleSchema = new mongoose.Schema({
  appUser: { type: mongoose.Schema.Types.ObjectId, ref: "AppUser" },
  deleteDbCalls: { type: Number, default: 0 },
});

const rolesSchema = new mongoose.Schema({
  roleName: { type: String, enum: ["UserRole", "AdminRole"], default: "UserRole" },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "roles.roleName",
    required: true,
  },
});

const appUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  roles: [rolesSchema],
});

export const UserRole =
  mongoose.models.UserRole || mongoose.model("UserRole", userRoleSchema);

export const AdminRole =
  mongoose.models.AdminRole || mongoose.model("AdminRole", adminRoleSchema);

export const AppUser =
  mongoose.models.AppUser || mongoose.model("AppUser", appUserSchema);

export const Role = mongoose.models.Role || mongoose.model("Role", rolesSchema);
