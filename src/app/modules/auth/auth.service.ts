import bcrypt from "bcrypt";
import { TUserRole } from "./../user/user.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import { createJwtToken } from "../../utils/createJwtToken";
import { JwtPayload } from "jsonwebtoken";

const loggingUserIntoDB = async (payload: TAuth) => {
  //user exist
  const user = await User.isUserExistByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //is user is deleted
  if (await User.isUserDeleted(payload?.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  //password matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match");
  }

  const accessToken = createJwtToken(user);
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  //user exist
  const user = await User.isUserExistByCustomId(userData?.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //is user is deleted
  if (await User.isUserDeleted(userData?.userId)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  //password matched
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not match");
  }

  //hashd password
  const hashdPassword = await bcrypt.hash(payload?.newPassword, 12);
  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: hashdPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    }
  );
  return null;
};
export const authService = {
  loggingUserIntoDB,
  changePasswordIntoDB,
};
