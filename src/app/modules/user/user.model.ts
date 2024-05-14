import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeTime: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
    },
    status: {
      type: String,
      enum: ["is-progress", "block"],
      default: "is-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// document  middleware
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

//statics

/** Check if user exist on database*/
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

/** Check if user deleted on database*/
userSchema.statics.isUserDeleted = async function (id: string) {
  return await User.findOne({ id, isDeleted: true });
};

/** Check request password and haspassword matched*/
userSchema.statics.isPasswordMatched = async function (
  plaintextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plaintextPassword, hashPassword);
};
//
userSchema.statics.isJWTBeforPasswordChanged = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordFormatTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordFormatTime > jwtIssuedTimestamp;
};
export const User = model<TUser, UserModel>("User", userSchema);
