import jwt from "jsonwebtoken";
import { TUser } from "../modules/user/user.interface";
import config from "../config";

export const createJwtToken = (user: TUser) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    config.jwt_secret as string,
    { expiresIn: "1d" }
  );
};
