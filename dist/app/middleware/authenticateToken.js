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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const authenticateToken = (...roles) => {
    return (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized to access");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, userId, iat } = decoded;
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
        if (roles && !roles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You can not Authorized user");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authenticateToken;
