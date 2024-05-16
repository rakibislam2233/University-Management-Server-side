import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

const loggingUser = cathcAsync(async (req, res) => {
  const result = await authService.loggingUserIntoDB(req.body);
  const { refreshToken, ...remainingData } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: remainingData,
  });
});

const changePassword = cathcAsync(async (req, res) => {
  const passwordData = req.body;

  const result = await authService.changePasswordIntoDB(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password change successfully",
    data: result,
  });
});

const refreshToken = cathcAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

const forgotPassword = cathcAsync(async (req, res) => {
  const { id } = req.body;
  const result = await authService.forgotPassword(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link created  successfully",
    data: result,
  });
});

const resetPassword = cathcAsync(async (req, res) => {
  const token = req.headers?.authorization as string;
  const result = await authService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});
export const authController = {
  loggingUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
