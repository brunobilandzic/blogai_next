import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  appUser: { type: mongoose.Schema.Types.ObjectId, ref: "AppUser" },
  credits: { type: Number, default: 0 },
  blogParametersCreated: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BlogParameters" },
  ],
});

const adminSchema = new mongoose.Schema({
  appUser: { type: mongoose.Schema.Types.ObjectId, ref: "AppUser" },
  deleteDbCalls: { type: Number, default: 0 },
});

const rolesSchema = new mongoose.Schema({
  roleName: { type: String, enum: ["User", "Admin"], default: "User" },
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

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export const AppUser =
  mongoose.models.AppUser || mongoose.model("AppUser", appUserSchema);

export const Role = mongoose.models.Role || mongoose.model("Role", rolesSchema);
