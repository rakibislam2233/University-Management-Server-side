import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { createJwtToken } from "./auth.utils";
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";

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

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
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

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token as string,
    config.jwt_refresh_token as string
  );
  const { userId, iat } = decoded as JwtPayload;
  //user exist
  const user = await User.isUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //is user is deleted
  if (await User.isUserDeleted(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  //
  if (
    user.passwordChangeTime &&
    User.isJWTBeforPasswordChanged(user.passwordChangeTime, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You can not Authorized user");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string
  );
  return {
    accessToken,
  };
};

const forgotPassword = async (userId: string) => {
  //user exist
  const user = await User.isUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //is user is deleted
  if (await User.isUserDeleted(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const resetToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );
  const resetURLlink = `${config.reset_password_url}?id=${user.id}&token=${resetToken}`;

  await sendEmail(user.email, resetURLlink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //is user is deleted
  if (await User.isUserDeleted(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string
  );
  const { userId, role } = decoded as JwtPayload;
  if (user.id !== userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You can not Authorized user");
  }
  //hashd password
  const hashdPassword = await bcrypt.hash(payload?.newPassword, 12);
  await User.findOneAndUpdate(
    { id: userId, role: role },
    {
      password: hashdPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    }
  );
};
export const authService = {
  loggingUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
  forgotPassword,
  resetPassword,
};
