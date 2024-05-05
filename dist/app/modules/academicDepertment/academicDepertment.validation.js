"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepertmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepertmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required",
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "Academic facult must be a string",
            required_error: "Academic faculty is required",
        }),
    }),
});
const updateAcademicDepertmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required",
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: "Academic facult must be a string",
            required_error: "Academic faculty is required",
        })
            .optional(),
    }),
});
exports.academicDepertmentValidation = {
    createAcademicDepertmentSchema,
    updateAcademicDepertmentSchema,
};
