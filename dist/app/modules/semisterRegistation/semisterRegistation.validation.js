"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemisterRegistationValidation = void 0;
const zod_1 = require("zod");
const createSemisterRegistationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemister: zod_1.z.string().min(1),
        status: zod_1.z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).default("UPCOMING"),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        minCredit: zod_1.z.number().default(3),
        maxCredit: zod_1.z.number().default(15),
    }),
});
const updateSemisterRegistationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemister: zod_1.z.string().min(1).optional(),
        status: zod_1.z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).default("UPCOMING"),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        minCredit: zod_1.z.number().default(3).optional(),
        maxCredit: zod_1.z.number().default(15).optional(),
    }),
});
exports.SemisterRegistationValidation = {
    createSemisterRegistationValidationSchema,
    updateSemisterRegistationValidationSchema,
};
