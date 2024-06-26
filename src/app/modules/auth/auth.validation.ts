import { z } from "zod";

const loggingUserValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});
const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
});

const forgotPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
  }),
});
const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});
export const authValidation = {
  loggingUserValidation,
  changePasswordValidation,
  refreshTokenValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
