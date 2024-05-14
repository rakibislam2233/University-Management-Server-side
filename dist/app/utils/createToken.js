"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createJwtToken = (user) => {
    jsonwebtoken_1.default.sign({
        userId: user.id,
        role: user.role,
    }, config_1.default.jwt_secret, { expiresIn: "1h" });
};
exports.createJwtToken = createJwtToken;
