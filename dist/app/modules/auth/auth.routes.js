"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authenticateToken_1 = __importDefault(require("../../middleware/authenticateToken"));
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loggingUserValidation), auth_controller_1.authController.loggingUser);
router.post("/change-password", (0, authenticateToken_1.default)("admin", "faculty", "student"), (0, validateRequest_1.default)(auth_validation_1.authValidation.changePasswordValidation), auth_controller_1.authController.changePassword);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidation), auth_controller_1.authController.refreshToken);
router.post("/forgot-password", (0, validateRequest_1.default)(auth_validation_1.authValidation.forgotPasswordValidation), auth_controller_1.authController.forgotPassword);
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.authValidation.resetPasswordValidation), auth_controller_1.authController.resetPassword);
exports.authRoutes = router;
