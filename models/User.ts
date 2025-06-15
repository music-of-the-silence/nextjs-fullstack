import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// DEFINE DATA TYPES
export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// CREATION OF SCHEMA
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// PRE-HOOKS

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
