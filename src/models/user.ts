import bcrypt from "bcryptjs";
import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export default model<IUser>("User", userSchema);
