"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = exports.createStudentValidationSchema = void 0;
const zod_1 = require("zod");
const createUserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: "First Name must start with a capital letter",
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const createGuardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
const createLocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: createUserNameSchema,
            gender: zod_1.z.enum(["male", "female", "other"]),
            dateOfBirth: zod_1.z.string(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string(),
            emergencyContactNo: zod_1.z.string(),
            bloogGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            presentAddress: zod_1.z.string(),
            permanentAddress: zod_1.z.string(),
            guardian: createGuardianSchema,
            localGuardian: createLocalGuardianSchema,
            academicSemister: zod_1.z.string(),
            academicDepertment: zod_1.z.string(),
            profileImg: zod_1.z.string(),
        }),
    }),
});
exports.studentValidations = {
    createStudentValidationSchema: exports.createStudentValidationSchema,
};
