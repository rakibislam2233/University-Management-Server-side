import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { cathcAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const authenticateToken = (...roles: TUserRole[]) => {
  return cathcAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized to access");
    }
    const decoded = jwt.verify(token as string, config.jwt_access_secret as string);
    const { role, userId, iat } = decoded as JwtPayload;
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
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can not Authorized user"
      );
    }
    if (roles && !roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You can not Authorized user"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authenticateToken;
