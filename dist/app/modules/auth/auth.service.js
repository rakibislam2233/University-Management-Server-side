"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utils/sendEmail");
const loggingUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //user exist
    const user = yield user_model_1.User.isUserExistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(payload === null || payload === void 0 ? void 0 : payload.id)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    //password matched
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not match");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createJwtToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = (0, auth_utils_1.createJwtToken)(jwtPayload, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_expire_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const changePasswordIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //user exist
    const user = yield user_model_1.User.isUserExistByCustomId(userData === null || userData === void 0 ? void 0 : userData.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(userData === null || userData === void 0 ? void 0 : userData.userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    //password matched
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not match");
    }
    //hashd password
    const hashdPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, 12);
    yield user_model_1.User.findOneAndUpdate({ id: userData.userId, role: userData.role }, {
        password: hashdPassword,
        needsPasswordChange: false,
        passwordChangeTime: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_token);
    const { userId, iat } = decoded;
    //user exist
    const user = yield user_model_1.User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    //
    if (user.passwordChangeTime &&
        user_model_1.User.isJWTBeforPasswordChanged(user.passwordChangeTime, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can not Authorized user");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createJwtToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    return {
        accessToken,
    };
});
const forgotPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //user exist
    const user = yield user_model_1.User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const resetToken = (0, auth_utils_1.createJwtToken)(jwtPayload, config_1.default.jwt_access_secret, "10m");
    const resetURLlink = `${config_1.default.reset_password_url}?id=${user.id}&token=${resetToken}`;
    yield (0, sendEmail_1.sendEmail)(user.email, resetURLlink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(payload.id)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userId, role } = decoded;
    if (user.id !== userId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can not Authorized user");
    }
    //hashd password
    const hashdPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, 12);
    yield user_model_1.User.findOneAndUpdate({ id: userId, role: role }, {
        password: hashdPassword,
        needsPasswordChange: false,
        passwordChangeTime: new Date(),
    });
});
exports.authService = {
    loggingUserIntoDB,
    changePasswordIntoDB,
    refreshToken,
    forgotPassword,
    resetPassword,
};
