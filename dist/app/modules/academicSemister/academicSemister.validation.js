"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemisterValidation = void 0;
const zod_1 = require("zod");
const academicSemister_constant_1 = require("./academicSemister.constant");
const createAcademicSemisterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemister_constant_1.AcademicSemisterName]),
        year: zod_1.z.string(),
        code: zod_1.z.enum([...academicSemister_constant_1.AcademicSemisterCode]),
        startMonth: zod_1.z.enum([...academicSemister_constant_1.AcademicSemisterMonth]),
        endMonth: zod_1.z.enum([...academicSemister_constant_1.AcademicSemisterMonth]),
    }),
});
const updateAcademicSemisterValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .enum([...academicSemister_constant_1.AcademicSemisterName])
            .optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z
            .enum([...academicSemister_constant_1.AcademicSemisterCode])
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemister_constant_1.AcademicSemisterMonth])
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemister_constant_1.AcademicSemisterMonth])
            .optional(),
    })
        .optional(),
});
exports.academicSemisterValidation = {
    createAcademicSemisterValidationSchema,
    updateAcademicSemisterValidationSchema
};
