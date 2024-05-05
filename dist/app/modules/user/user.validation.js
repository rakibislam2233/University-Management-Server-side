"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be string",
    })
        .max(20, { message: "Password can not be less than 20 characters" }),
});
exports.userValidation = {
    createUserValidationSchema,
};
