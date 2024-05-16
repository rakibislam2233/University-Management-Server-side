import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  passwordChangeTime?: Date;
  needsPasswordChange: boolean;
  role: "admin" | "faculty" | "student";
  status: "is-progress" | "block";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isUserDeleted(id: string): Promise<boolean>;
  isPasswordMatched(
    plaintextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
  isJWTBeforPasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
