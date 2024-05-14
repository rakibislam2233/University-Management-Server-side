import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loggingUser = cathcAsync(async (req, res) => {
  const result = await authService.loggingUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
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

export const authController = {
  loggingUser,
  changePassword,
};
