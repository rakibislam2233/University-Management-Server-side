"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offredCourseValidation = void 0;
const z = __importStar(require("zod"));
const offredCourse_constant_1 = require("./offredCourse.constant");
const createOffredCourseValidationSchame = z.object({
    body: z.object({
        seminsterRegistation: z.string(),
        academicFaculty: z.string(),
        academicDepertment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
        section: z.number().min(1, "Section must be at least 1"),
        days: z.array(z.enum([...offredCourse_constant_1.Days])),
        startTime: z.string(),
        endTime: z.string(),
    }),
});
const updateOffredCourseValidationSchame = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z
            .number()
            .min(1, "Max capacity must be at least 1")
            .optional(),
        days: z.enum([...offredCourse_constant_1.Days]).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});
exports.offredCourseValidation = {
    createOffredCourseValidationSchame,
    updateOffredCourseValidationSchame,
};
