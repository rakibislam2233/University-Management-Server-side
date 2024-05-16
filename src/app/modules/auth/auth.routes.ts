import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middleware/validateRequest";
import authenticateToken from "../../middleware/authenticateToken";
import { USER_ROLE } from "../user/user.constant";

const router = Router();
router.post(
  "/login",
  validateRequest(authValidation.loggingUserValidation),
  authController.loggingUser
);

router.post(
  "/change-password",
  authenticateToken("admin", "faculty", "student"),
  validateRequest(authValidation.changePasswordValidation),
  authController.changePassword
);

router.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenValidation),
  authController.refreshToken
);

router.post(
  "/forgot-password",
  validateRequest(authValidation.forgotPasswordValidation),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validateRequest(authValidation.resetPasswordValidation),
  authController.resetPassword
);
export const authRoutes = router;
